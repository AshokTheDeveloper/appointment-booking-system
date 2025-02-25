const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const mongoose = require("mongoose");
const { format, parse, addMinutes, isBefore, isEqual } = require("date-fns");

const getAvailableSlots = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid doctor ID", success: false });
    }

    if (!date) {
      return res
        .status(400)
        .json({ message: "Date query parameter is required", success: false });
    }

    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res
        .status(404)
        .json({ message: "Doctor not found", success: false });
    }

    const appointments = await Appointment.find({
      doctorId: id,
      date: {
        $gte: new Date(`${date}T00:00:00.000Z`),
        $lt: new Date(`${date}T23:59:59.999Z`),
      },
    });

    const bookedSlots = appointments.map((appointment) =>
      format(new Date(appointment.date), "HH:mm")
    );

    const availableSlots = generateAvailableSlots(
      doctor.workingHours,
      bookedSlots,
      date
    );

    return res.status(200).json({
      date,
      availableSlots,
      success: true,
      count: availableSlots.length,
    });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};


const generateAvailableSlots = (workingHours, bookedSlots, date) => {
  const slots = [];

  const startTime = parse(
    `${date} ${workingHours.start}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );
  const endTime = parse(
    `${date} ${workingHours.end}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );

  let currentTime = startTime;

  while (isBefore(currentTime, endTime) || isEqual(currentTime, endTime)) {
    const timeString = format(currentTime, "HH:mm");
    if (!bookedSlots.includes(timeString)) {
      slots.push(timeString);
    }
    currentTime = addMinutes(currentTime, 60);
  }

  return slots;
};

module.exports = getAvailableSlots;
