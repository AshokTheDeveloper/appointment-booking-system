import { createContext } from "react";

export const appointmentContext = createContext();

export const ContextProvider = (props) => {
  const apiUrl = "https://appointment-booking-system-l99p.onrender.com";
  const value = {
    apiUrl,
  };

  return (
    <appointmentContext.Provider value={value}>
      {props.children}
    </appointmentContext.Provider>
  );
};
