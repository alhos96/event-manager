const { Event } = require("../models/eventModel");
const { User } = require("../models/userModel");

exports.createEvent = async (req, res, next) => {
  const { title, description, price, date, category } = req.body;
  const { userId, userName } = req.userData;

  const newEvent = new Event({
    title,
    description,
    price,
    date,
    category,
    creator: userName,
    image: req.file ? req.file.filename : "noImage.png",
  });

  await newEvent.save();

  let user = await User.findOne({ _id: userId });

  user.events.push(newEvent._id);
  await user.save();

  res.status(200).json({ data: newEvent });
};

exports.getEvents = async (req, res, next) => {
  let events = await Event.find();

  res.status(200).json({ data: events });
};

exports.registrationRequest = async (req, res, next) => {
  const { eventId, email } = req.body;
  const userWhoRegistered = email;

  let event = await Event.findById(eventId);

  event.registrationRequests.push({ userWhoRegistered });

  event.save();

  let events = await Event.find();

  res.status(200).json({ data: events });
};

exports.registrationAnswer = async (req, res, next) => {
  const { eventId, email, answer } = req.body;
  const userWhomToAnswer = email;

  let event = await Event.findById(eventId);

  event.registrationRequests.map((request) => {
    if (request.userWhoRegistered === userWhomToAnswer) {
      request.isAnswered = true;
      request.status = answer;
    }
  });

  event.save();

  let events = await Event.find();

  res.status(200).json({ data: events });
};

exports.getUsersEvents = async (req, res, next) => {
  let userId = req.userData.userId;

  let user = await User.findById(userId).populate("events");

  res.status(200).json({ data: user.events });
};

exports.deleteEvent = async (req, res, next) => {
  const { eventId } = req.body;

  await Event.findByIdAndDelete(eventId);

  let events = await Event.find();

  res.status(200).json({ data: events });
};
