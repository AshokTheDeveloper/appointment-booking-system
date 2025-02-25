# Appointment Booking System
## Overview:
This is a full-stack web application for a prenatal care service that allows users to view available appointment slots and book appointments with doctors. The system ensures that appointments are scheduled only within the doctor’s predefined working hours and prevents double bookings.

## Frontend Setup
1. Navigate to the frontend folder:
``` bash
cd myapp
```
2. Install Depedencies:
``` bash
npm install
```
3. Start the server
``` bash
npm run dev
```
## Packages installed
Frontend Dependencies & Setup
The frontend of this application is built using React and powered by Vite for fast development and optimized builds.

Dependencies
The package.json includes the following dependencies:

### UI & Styling:

- bootstrap: For responsive and modern UI components.
- react-icons: Provides scalable vector icons.
### Date & Time Handling:

- date-fns: A modern JavaScript date utility library.
### Routing & Navigation:

- react-router-dom: Enables client-side routing.
### User Experience Enhancements:

- react-toastify: Provides toast notifications for better user feedback.
- react-spinners: Displays loading animations.

### Lazy Loading implemented
To improve performance and optimize the initial load time, this application implements lazy loading using React's lazy and Suspense.

### App Component
``` jsx
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

```


## Design Decisions
### Tech Stack Choice:
- Backend: Node.js & Express for API handling.
- Database: MongoDB for flexible data storage, enabling efficient queries.
- Frontend: React for a dynamic and interactive UI.
 - `Lazy Loading`: Implemented for React components using React.lazy() and Suspense to improve performance.
- `State Management`: Minimal external state management React's built-in state and useContext (if needed) were prioritized.
- `API Design`:
RESTful API structure for clarity and scalability.
Separate endpoints for doctors, appointments, and available slots.
- `Error Handling`:
    - Backend APIs return meaningful error messages.
    - Frontend displays user-friendly notifications using react-toastify.
- `Responsive UI`: The frontend is built with React and Bootstrap to ensure mobile-friendly design.
- `React Loader`: Implemented react loader spinner to handle api state