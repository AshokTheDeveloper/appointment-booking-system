import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { showToast } from "../Notifications/Notifications";
import "./AppointmentForm.css";

const AppointmentForm = ({ submit, close }) => {
  const [patientName, setPatientName] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [duration, setDuration] = useState("");

  const handlePatientName = (event) => {
    setPatientName(event.target.value);
  };
  const handleAppointmentType = (event) => {
    setAppointmentType(event.target.value);
  };

  const handleDuration = (event) => {
    setDuration(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!patientName || !appointmentType || !duration) {
      showToast("Required all the fields", "error");
      return;
    }

    const patientDetails = {
      patientName,
      appointmentType,
      duration: parseInt(duration),
    };

    submit(patientDetails);
    close();
  };

  const handleCloseForm = () => {
    close();
    window.location.reload();
  };

  return (
    <div className="appointment-form-wrapper">
      <form className="form d-flex flex-column" onSubmit={handleSubmit}>
        <span className="text-primary fs-5 text-center mb-4 fw-bold">
          Book Appointment
        </span>
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={handlePatientName}
        />
        <input
          type="text"
          placeholder="Appointment Type"
          value={appointmentType}
          onChange={handleAppointmentType}
        />
        <input
          type="text"
          placeholder="Duration"
          value={duration}
          onChange={handleDuration}
        />
        <button type="submit" className="text-light bg-primary">
          Book
        </button>
      </form>
      <button className="form-close-button" onClick={handleCloseForm}>
        <IoClose className="text-light close-icon" />
      </button>
    </div>
  );
};

export default AppointmentForm;
