import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import { format, addDays } from "date-fns";
import DateItem from "../DateItem/DateItem";
import TimeSlot from "../TimeSlot/TimeSlot";
import AppointmentForm from "../Form/AppointmentForm";
import { showToast } from "../Notifications/Notifications";
import { appointmentContext } from "../../context/AppointmentContext";
import "./DoctorDetails.css";

const Appointment = () => {
  const { id } = useParams();
  const { apiUrl } = useContext(appointmentContext);

  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const upcomingDates = Array.from({ length: 7 }, (_, i) =>
      format(addDays(new Date(), i), "yyyy-MM-dd")
    );
    setDates(upcomingDates);
  }, []);

  useEffect(() => {
    getTimeSlots();
  }, [selectedDate]);

  useEffect(() => {
    handleOpenForm();
  }, [selectedTimeSlot]);

  const onSuccessful = (message) => {
    showToast(message, "success");
  };

  const onFailure = (message) => {
    showToast(message, "failure");
  };

  const getTimeSlots = async () => {
    if (id && selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const url = `${apiUrl}/${id}/slots?date=${formattedDate}`;
      const options = {
        method: "GET",
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setTimeSlots(data.availableSlots); // setting time slots
      } catch (error) {
        onFailure(error.message);
      }
    }
  };

  const handleChooseDate = (date) => {
    setSelectedDate(date);
  };

  const handleChooseTimeSlot = (slot) => {
    setSelectedTimeSlot(slot);
  };

  const renderDates = () => (
    <div className="d-flex flex-wrap gap-2 mt-5">
      {dates.map((date) => (
        <DateItem key={date} date={date} chooseDate={handleChooseDate} />
      ))}
    </div>
  );

  const renderTimeSlots = () => (
    <div className="d-flex gap-2 flex-wrap mt-3">
      {timeSlots.map((slot) => (
        <TimeSlot
          key={slot}
          slot={slot}
          chooseTimeSlot={handleChooseTimeSlot}
        />
      ))}
    </div>
  );

  const handleOpenForm = () => {
    if (selectedDate && selectedTimeSlot) {
      setOpenForm(true);
    }
  };

  const handleBookAppointmentApi = async (data) => {
    const formattedDate = new Date(
      `${selectedDate}T${selectedTimeSlot}:00.000Z`
    ).toISOString();

    const newAppointment = {
      doctorId: id,
      date: formattedDate,
      ...data,
    };

    const url = `${apiUrl}/appointments`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAppointment),
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        onSuccessful(data.message);
      } else {
        onFailure(data.message);
      }
    } catch (error) {
      onFailure(error.message);
    }
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <>
      <Header />
      <div className="appointment-wrapper">
        <h1 className="text-dark fs-4 mt-4">Booking Slots</h1>
        {renderDates()}
        {renderTimeSlots()}
      </div>
      {openForm && (
        <AppointmentForm
          submit={handleBookAppointmentApi}
          close={handleCloseForm}
        />
      )}
    </>
  );
};

export default Appointment;
