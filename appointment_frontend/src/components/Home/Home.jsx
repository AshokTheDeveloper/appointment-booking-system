import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import DoctorCard from "../DoctorCard/DoctorCard";
import { showToast } from "../Notifications/Notifications";
import Loading from "../Loading/Loading";
import { appointmentContext } from "../../context/AppointmentContext";
import "./Home.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  inProgress: "IN_PROGRESS",
};

const Home = () => {
  const { apiUrl } = useContext(appointmentContext);

  const [doctors, setDoctors] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    setApiStatus(apiStatusConstants.inProgress);

    const url = apiUrl;
    const options = {
      method: "GET",
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        setDoctors(data.doctors);
        showToast(data.message, "success");
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const renderDoctors = () => (
    <div className="d-flex flex-wrap justify-content-center gap-2 mt-4 mb-4">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor._id} doctor={doctor} />
      ))}
    </div>
  );

  const renderCurrentStatus = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <Loading />;
      case apiStatusConstants.success:
        return renderDoctors();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="container home">
        <div className="row">{renderCurrentStatus()}</div>
      </div>
    </>
  );
};

export default Home;
