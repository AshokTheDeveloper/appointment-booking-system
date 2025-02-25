const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, duration, appointmentType, patientName, notes } = req.body;

    if (duration === null) {
      return res
        .status(400)
        .json({ message: "Invalid field duration provided", success: false });
    }

    if (!date || !duration || !appointmentType || !patientName) {
      return res
        .status(400)
        .json({ message: "Required all the fields", success: false });
    }

    if (typeof duration !== "number" || ![30, 60].includes(duration)) {
      return res.status(400).json({
        message: "Duration should be either 30 or 60 minutes.",
        success: false,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid appointment ID", success: false });
    }

    const existingAppointment = await Appointment.findById(id);
    if (!existingAppointment) {
      return res
        .status(404)
        .json({ message: "Appointment not found", success: false });
    }

    const doctor = await Doctor.findById(existingAppointment.doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ message: "Doctor not found", success: false });
    }

    const newAppointmentDate = new Date(date);
    if (newAppointmentDate <= new Date()) {
      return res
        .status(400)
        .json({ message: "Appointment date must be in the future." });
    }

    const { start, end } = doctor.workingHours;
    const workingStartTime = new Date(`1970-01-01T${start}:00Z`);
    const workingEndTime = new Date(`1970-01-01T${end}:00Z`);

    const newStartTime = new Date(newAppointmentDate);
    const newEndTime = new Date(newStartTime.getTime() + duration * 60000);

    if (
      newStartTime.getUTCHours() < workingStartTime.getUTCHours() ||
      newEndTime.getUTCHours() > workingEndTime.getUTCHours()
    ) {
      return res.status(400).json({
        message: "Appointment must be within the doctor's working hours.",
      });
    }

    const conflictingAppointments = await Appointment.find({
      doctorId: existingAppointment.doctorId,
      _id: { $ne: id },
      date: { $gte: newStartTime, $lt: newEndTime },
    });

    if (conflictingAppointments.length > 0) {
      return res.status(400).json({ message: "Time slot already booked." });
    }

    existingAppointment.date = newStartTime;
    existingAppointment.duration = duration;
    existingAppointment.appointmentType = appointmentType;
    existingAppointment.patientName = patientName;
    existingAppointment.notes = notes;

    await existingAppointment.save();

    res.status(200).json({
      message: "Appointment updated successfully",
      success: true,
      appointment: existingAppointment,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = updateAppointment;
