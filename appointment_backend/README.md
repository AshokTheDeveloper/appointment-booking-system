# Booking Appointments Backend APIs

### Overview
This is a full-stack web application for a prenatal care service that allows users to view available appointment slots and book appointments with doctors. The system ensures that appointments are scheduled only within the doctor’s predefined working hours and prevents double bookings.

### Features
- Doctor Management: Add and manage doctors and their working hours
- Appointment Booking: Users can book appointments within available time slots
- Conflict Prevention: Ensures no double bookings
- Real-time Updates: Users get immediate feedback when booking
- Responsive UI: Built with React for a smooth user experience

### Installation & Setup
### Backend Setup
Navigate to the backend folder:
``` bash
cd backend
```
### Install dependencies:
``` bash
npm install
```
### Create a .env file and configure your MongoDB connection:
``` bash
MONGO_URI=your_mongodb_connection_string
PORT=3003
```
### Packages installed
``` bash
npm install express mongoose dotenv cors date-fns
```
## API Endpoints

## Doctor Routes:

### GET /doctors - Fetch all doctors
### response:
``` json
  "doctors": [
    {
      "_id": "67bb4452b248eccf915b825a",
      "name": "Dr. Alice Johnson",
      "workingHours": {
        "start": "05:30",
        "end": "11:30"
      },
      "specialization": "Gynecologist",
      "createdAt": "2025-02-23T15:52:50.106Z",
      "updatedAt": "2025-02-23T15:52:50.106Z",
      "__v": 0
    },
    ...
  ],
  "success": true,
  "count": 20
```

### GET /doctors/:id/slots - Fetch available slots for a specific doctor
### Response
``` json
{
  "date": "2025-03-10",
  "availableSlots": [
    "11:00",
    "12:00",
    "13:00",
    ...
  ],
  "success": true,
  "count": 8
}
```

## Appointment Routes:

### GET /appointments - Fetch all appointments

###  Response 
``` json 
{
  "appointments": [
    {
      "_id": "67bb5e32c2fddf5dc8ead20d",
      "doctorId": "67bb46e2fe8917fb6478ef98",
      "date": "2025-03-12T12:30:00.000Z",
      "duration": 60,
      "appointmentType": "Ultrasound",
      "patientName": "Jane Doe",
      "createdAt": "2025-02-23T17:43:14.242Z",
      "updatedAt": "2025-02-25T12:22:19.840Z",
      "__v": 0
    },
    ...
  ],
  "success": true,
  "count": 7
}
```

### GET /appointments/:id - Fetch a specific appointment
### Response 
``` json
{
  "success": true,
  "message": "Appointment retrieved successfully",
  "appointment": {
    "_id": "67bb5e32c2fddf5dc8ead20d",
    "doctorId": "67bb46e2fe8917fb6478ef98",
    "date": "2025-03-12T12:30:00.000Z",
    "duration": 60,
    ...
  }
}
```

### POST /appointments - Create a new appointment

### PUT /appointments/:id - Update an appointment

### DELETE /appointments/:id - Cancel an appointment

## Assumptions:
Here are some key assumptions and design decisions made while developing this Prenatal Care Appointment Booking System:

1. Doctor's Working Hours are Fixed:

   - Each doctor has predefined working hours (e.g., 9 AM - 5 PM).
   - These hours are set during doctor creation and are used to determine available appointment slots.
2. Appointment Durations are Consistent:

   - Each appointment has a fixed duration, set when booking an appointment.
The system ensures appointments do not overlap.
3. Users Book One Slot at a Time:

    - A user cannot book multiple slots at once.
Each booking request is processed separately to prevent conflicts.
Time Zones & Date Handling:

4. No User Authentication in Basic Version:
   - Authentication (e.g., login, role-based access) is not required for booking appointments in the basic version.
However, it can be implemented later for enhanced security.