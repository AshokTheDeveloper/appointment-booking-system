const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    workingHours: {
      type: Object,
      required: true,
      validate: {
        validator: function (value) {
          if (!value.start || !value.end) return false;

          const startTime = new Date(`1970-01-01T${value.start}:00Z`);
          const endTime = new Date(`1970-01-01T${value.end}:00Z`);

          return startTime < endTime;
        },
        message: "Start time must be before end time",
      },
    },
    specialization: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", DoctorSchema);
module.exports = Doctor;
