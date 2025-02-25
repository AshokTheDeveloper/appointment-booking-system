import React from "react";
import { format } from "date-fns";
import "./DateItem.css";

const DateItem = ({ date, chooseDate }) => {
  const formattedDate = format(date, "dd EEE");
  const currentDate = formattedDate.split(" ")[0];
  const dayName = formattedDate.split(" ")[1];

  const pickDate = () => {
    chooseDate(date);
  };
  return (
    <div className="date-button-wrapper">
      <button
        onClick={pickDate}
        className="d-flex flex-column justify-content-center align-items-center border-0 p-3 text-light"
      >
        <span>{dayName}</span>
        <span>{currentDate}</span>
      </button>
    </div>
  );
};

export default DateItem;
