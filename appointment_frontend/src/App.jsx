import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Notification from "./components/Notifications/Notifications";
import Loading from "./components/Loading/Loading";
import "./App.css";

const Home = lazy(() => import("./components/Home/Home"));
const DoctorDetails = lazy(() =>
  import("./components/DoctorDetails/DoctorDetails")
);
const Appointments = lazy(() =>
  import("./components/Appointments/Appointments")
);

function App() {
  return (
    <>
      <Notification />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/doctor/:id" element={<DoctorDetails />} />
          <Route exact path="/appointments" element={<Appointments />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
