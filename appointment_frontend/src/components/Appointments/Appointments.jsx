import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import Header from "../Header/Header";
import AppointmentItem from "../AppointmentItem/AppointmentItem";
import UpdateForm from "../UpdateForm/UpdateForm";
import { showToast } from "../Notifications/Notifications";
import Loading from "../Loading/Loading";
import { appointmentContext } from "../../context/AppointmentContext";
import "./Appointments.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  inProgress: "IN_PROGRESS",
};

const Appointments = () => {
  const { apiUrl } = useContext(appointmentContext);

  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    getAppointments();
  }, []);

  useEffect(() => {
    if (formData) {
      setFormData((prevData) => ({ ...prevData, timeSlots }));
      setShowForm(true);
    }
  }, [timeSlots]);

  const onSuccess = (message) => {
    showToast(message, "success");
  };

  const onFailure = (message) => {
    showToast(message, "failure");
  };

  const getAppointments = async () => {
    setApiStatus(apiStatusConstants.inProgress);

    const url = `${apiUrl}/appointments`;
    const options = {
      method: "GET",
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setAppointments(data.appointments);
        onSuccess(data.message);
        setApiStatus(apiStatusConstants.success);
      } else {
        onFailure(data.message);
        setApiStatus(apiStatusConstants.onFailure);
      }
    } catch (error) {
      onFailure(error.message);
    }
  };

  const removeAppointment = async (id) => {
    const url = `${apiUrl}/appointments/${id}`;
    const options = {
      method: "DELETE",
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        onSuccess(data.message);
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment._id !== id)
        );
      } else {
        onFailure(data.message);
      }
    } catch (error) {
      onFailure(error.message);
    }
  };

  const getAvailableSlots = async (appointmentData) => {
    const { doctorId, date } = appointmentData;
    const formattedDate = format(date, "yyyy-MM-dd");

    const url = `${apiUrl}/${doctorId}/slots?date=${formattedDate}`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setTimeSlots(data.availableSlots);
      }
    } catch (error) {
      onFailure(error.message);
    }
  };

  const handleUpdateAppointment = (id) => {
    const currentAppointment = appointments.find((item) => item._id === id);
    getAvailableSlots(currentAppointment);
    setFormData(currentAppointment);
  };

  const handleCancelAppointment = (id) => {
    removeAppointment(id);
  };

  const renderAppointments = () => (
    <div className="appointments d-flex flex-wrap mt-4 mb-5 align-items-center justify-content-center">
      {appointments.map((appointment) => (
        <AppointmentItem
          key={appointment._id}
          appointment={appointment}
          updateAppointment={handleUpdateAppointment}
          cancelAppointment={handleCancelAppointment}
        />
      ))}
    </div>
  );

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleUpdateFormSubmission = async (dataObj) => {
    console.log("forms: ", dataObj);
    const { _id } = dataObj;
    const url = `${apiUrl}/appointments/${_id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        onSuccess(data.message);
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === _id
              ? { ...appointment, ...data.appointment }
              : appointment
          )
        );
      } else {
        onFailure(data.message);
      }
    } catch (error) {
      onFailure(error.message);
    }
  };

  const renderCurrentStatus = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <Loading />;
      case apiStatusConstants.success:
        return renderAppointments();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="appointments-wrapper">{renderCurrentStatus()}</div>
      {showForm && (
        <UpdateForm
          submit={handleUpdateFormSubmission}
          close={handleCloseForm}
          formData={formData}
        />
      )}
    </>
  );
};

export default Appointments;
