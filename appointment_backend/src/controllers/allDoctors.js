const Doctor = require("../models/Doctor");

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    if (doctors.length === 0) {
      return res
        .status(404)
        .json({ message: "No doctors found", success: false });
    }
    const countOfDoctors = doctors.length;
    res.status(200).json({ doctors, success: true, count: countOfDoctors });
  } catch (error) {
    console.log("Error getting all doctors: , error");
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = getDoctors;
