const Doctor = require("../models/Doctor");

const createDoctor = async (req, res) => {
  try {
    const { name, workingHours, specialization } = req.body;

    if (!name || !workingHours || !specialization) {
      return res
        .status(400)
        .json({ message: "Required all the fields", success: false });
    }

    const doctorExists = await Doctor.findOne({ name });

    if (doctorExists) {
      return res
        .status(400)
        .json({ message: "Doctor already exists", success: false });
    }
    const doctor = new Doctor({ name, workingHours, specialization });
    await doctor.save();

    res
      .status(201)
      .json({ message: "Doctor created successfully", success: true, doctor });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = createDoctor;
