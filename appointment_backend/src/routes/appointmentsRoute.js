const express = require("express");
const router = express.Router();

const createDoctor = require("../controllers/addDoctor");
const getDoctors = require("../controllers/allDoctors");
const getSlots = require("../controllers/getSlots");

const getAllAppointments = require("../controllers/allAppointments");
const getAppointmentDetails = require("../controllers/appointmentDetails");
const createAppointment = require("../controllers/createAppointment");
const updateAppointment = require("../controllers/updateAppointment");
const cancelAppointment = require("../controllers/cancelAppointment");

router.get("/", getDoctors);
router.post("/", createDoctor);

router.get("/appointments", getAllAppointments);
router.get("/appointments/:id", getAppointmentDetails);
router.post("/appointments", createAppointment);
router.put("/appointments/:id", updateAppointment);
router.delete("/appointments/:id", cancelAppointment);

router.get("/:id/slots", getSlots);

module.exports = router;
