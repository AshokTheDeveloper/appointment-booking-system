import React from "react";
import { Link } from "react-router-dom";
import "./DoctorCard.css";

const DoctorCard = (props) => {
  const { doctor } = props;
  const { name, specialization, _id } = doctor;
  const doctorProfile = name.split(" ")[0].toLowerCase() + name.split(" ")[1];
  return (
    <Link to={`/doctor/${_id}`} className="text-decoration-none">
      <div className="doctor-card card shadow col-lg-3 col-md-4 col-sm-6 border-0 cursor-pointer display-flex">
        <div className="card profile-wrapper border-0">
          <div className="text-center profile">
            <h1 className="text-light font-weight-bold">
              {doctorProfile.toUpperCase()}
            </h1>
          </div>
        </div>
        <p className="text-primary mt-2 ps-4 fs-4">{name}</p>
        <p className="text-dark ps-4">{specialization}</p>
      </div>
    </Link>
  );
};

export default DoctorCard;
