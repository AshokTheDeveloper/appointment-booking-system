const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");

const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Appointment id is required", success: false });
    }
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id", success: false });
    }
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res
        .status(404)
        .json({ message: "Appointment not found", success: false });
    }

    await Appointment.findByIdAndDelete(id);

    res.status(200).json({
      message: "Appointment canceled successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error canceling appointment:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = cancelAppointment;
