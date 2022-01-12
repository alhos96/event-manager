const express = require("express");
const router = express.Router();
const fileUpload = require("../midleware/multer");

const {
  createEvent,
  getEvents,
  registrationRequest,
  registrationAnswer,
  getUsersEvents,
  deleteEvent,
} = require("../controlers/eventControlers");

router.post("/create-event", fileUpload.single("img"), createEvent);
router.get("/get-events", getEvents);
router.get("/get-users-events", getUsersEvents);

router.patch("/registration-request", registrationRequest);
router.put("/registration-answer", registrationAnswer);

router.delete("/delete-event", deleteEvent);

module.exports = router;
