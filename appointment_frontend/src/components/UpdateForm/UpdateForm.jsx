import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { format } from "date-fns";
import { showToast } from "../Notifications/Notifications";
import "./UpdateForm.css";

const UpdateForm = ({ formData, submit, close }) => {
  const [patientName, setPatientName] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    if (formData) {
      const {
        patientName,
        appointmentType,
        duration,
        date,
        _id,
        doctorId,
        timeSlots,
      } = formData;

      const formattedDate = format(new Date(date), "yyyy-MM-dd");

      setAppointmentId(_id);
      setDoctorId(doctorId);
      setPatientName(patientName);
      setAppointmentType(appointmentType);
      setDuration(duration);
      setDate(formattedDate);
      setTimeSlots(timeSlots);
      if (timeSlots.length > 0) {
        setTime(timeSlots[0]);
      }
    }
  }, [formData]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handlePatientName = (event) => {
    setPatientName(event.target.value);
  };

  const handleAppointmentType = (event) => {
    setAppointmentType(event.target.value);
  };

  const handleDuration = (event) => {
    setDuration(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleCloseForm = () => {
    close();
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();

    if (
      !appointmentId ||
      !doctorId ||
      !patientName ||
      !appointmentType ||
      !duration ||
      !date ||
      !time
    ) {
      showToast("Required all the fields", "error");
      return;
    }

    const formattedDateTime = new Date(`${date}T${time}:00.000Z`).toISOString();

    const updatedAppointment = {
      _id: appointmentId,
      doctorId,
      patientName,
      appointmentType,
      duration: parseInt(duration),
      date: formattedDateTime,
    };

    submit(updatedAppointment);
    close();
  };

  return (
    <div className="update-form-wrapper">
      <form className="update-form" onSubmit={handleFormSubmission}>
        <p className="text-primary fw-bold fs-5 mt-2 p-4 text-center">
          Update Appointment
        </p>
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
        <input
          type="text"
          placeholder="Date"
          value={date}
          onChange={handleDateChange}
        />
        <select value={time} onChange={handleTimeChange}>
          {timeSlots.map((eachTime) => (
            <option key={eachTime} value={eachTime}>
              {eachTime}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="text-light bg-primary border-0 p-2 mt-4 rounded-1"
        >
          Update
        </button>
      </form>
      <button className="update-form-close-button" onClick={handleCloseForm}>
        <IoClose className="text-light update-close-icon" />
      </button>
    </div>
  );
};

export default UpdateForm;
