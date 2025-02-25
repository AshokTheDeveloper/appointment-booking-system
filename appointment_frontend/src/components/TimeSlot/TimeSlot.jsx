import React from "react";
import "./TimeSlot.css";

const TimeSlot = ({ slot, chooseTimeSlot }) => {
  
  const pickTimeSlot = () => {
    chooseTimeSlot(slot);
  };

  return (
    <div className="time-slot-wrapper pt-3">
      <button className="border-0 text-light" onClick={pickTimeSlot}>
        {slot}
      </button>
    </div>
  );
};

export default TimeSlot;
