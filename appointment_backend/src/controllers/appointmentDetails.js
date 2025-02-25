const Appointment = require("../models/Appointment");
const mongoose = require("mongoose");

const appointmentDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid appointment ID", success: false });
    }

    const appointment = await Appointment.findById(id)

    if (!appointment) {
      return res
        .status(404)
        .json({ message: "Appointment not found", success: false });
    }

    return res.status(200).json({
      success: true,
      message: "Appointment retrieved successfully",
      appointment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = appointmentDetails;
