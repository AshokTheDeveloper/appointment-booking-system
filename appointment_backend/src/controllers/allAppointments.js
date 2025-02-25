const Appointment = require("../models/Appointment");

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found", success: false });
    }

    const countOfAppointments = appointments.length;
    return res
      .status(200)
      .json({ appointments, success: true, count: countOfAppointments });
    
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

module.exports = getAllAppointments;
