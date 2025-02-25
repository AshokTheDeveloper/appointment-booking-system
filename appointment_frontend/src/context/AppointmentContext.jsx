import { createContext } from "react";

export const appointmentContext = createContext();

export const ContextProvider = (props) => {
  const apiUrl = "http://localhost:3003/doctors";
  const value = {
    apiUrl,
  };

  return (
    <appointmentContext.Provider value={value}>
      {props.children}
    </appointmentContext.Provider>
  );
};
