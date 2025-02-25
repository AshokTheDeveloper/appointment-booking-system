import React from "react";
import { format } from "date-fns";
import "./AppointmentItem.css";

const AppointmentItem = (props) => {
  const { appointment, updateAppointment, cancelAppointment } = props;
  const { patientName, appointmentType, duration, date, _id } = appointment;

  const formattedDate = format(date, "yyyy-MM-dd");
  const formattedTime = format(date, "HH:mm");

  const handleCancelAppointment = () => {
    cancelAppointment(_id);
  };

  const handleUpdateAppointment = () => {
    updateAppointment(_id);
  };

  return (
    <div className="appointment-card card shadow border-0 m-1 p-3">
      <p className="text-dark">
        <span>Patient Name: </span>
        <span className="bold">{patientName}</span>
      </p>
      <p className="text-dark">
        <span>Appointment Type: </span>
        <span className="bold">{appointmentType}</span>
      </p>
      <p className="text-dark">
        <span>Duration: </span>
        <span className="bold">{duration}</span>
      </p>
      <p className="text-dark">
        <span>Date: </span>
        <span className="bold">{formattedDate}</span>
      </p>
      <p className="text-dark">
        <span>Time: </span>
        <span className="bold">{formattedTime}</span>
      </p>
      <div className="appointment-buttons">
        <button
          className="text-light border-0"
          onClick={handleUpdateAppointment}
        >
          Edit
        </button>
        <button
          className="text-light border-0"
          onClick={handleCancelAppointment}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AppointmentItem;
