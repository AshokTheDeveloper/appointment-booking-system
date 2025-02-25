const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const mongoose = require("mongoose");

const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, duration, appointmentType, patientName, notes } =
      req.body;

    if (duration === null) {
      return res
        .status(400)
        .json({ message: "Invalid field duration provided", success: false });
    }

    if (!doctorId || !date || !duration || !appointmentType || !patientName) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    if (typeof duration !== "number" || ![30, 60].includes(duration)) {
      return res.status(400).json({
        message: "Duration should be either 30 or 60 minutes.",
        success: false,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({
        message: "Invalid doctor ID",
        success: false,
      });
    }

    const appointmentDate = new Date(date);
    if (appointmentDate <= new Date()) {
      return res.status(400).json({
        message: "Appointment date must be in the future.",
        success: false,
      });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ message: "Doctor not found", success: false });
    }

    const { start, end } = doctor.workingHours;
    const startTime = new Date(`1970-01-01T${start}:00Z`);
    const endTime = new Date(`1970-01-01T${end}:00Z`);

    const appointmentStart = new Date(appointmentDate);
    const appointmentEnd = new Date(
      appointmentStart.getTime() + duration * 60000
    );

    if (
      appointmentStart.getUTCHours() < startTime.getUTCHours() ||
      appointmentEnd.getUTCHours() > endTime.getUTCHours()
    ) {
      return res.status(400).json({
        message: "Appointment must be within the doctor's working hours.",
        success: false,
      });
    }

    const overlappingAppointments = await Appointment.find({
      doctorId,
      date: {
        $gte: appointmentStart,
        $lt: appointmentEnd,
      },
    });

    if (overlappingAppointments.length > 0) {
      return res.status(400).json({
        message: "Time slot already booked. Please choose another slot.",
        success: false,
      });
    }

    const newAppointment = new Appointment({
      doctorId,
      date: appointmentStart,
      duration,
      appointmentType,
      patientName,
      notes,
    });

    await newAppointment.save();
    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
      success: true,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = createAppointment;
