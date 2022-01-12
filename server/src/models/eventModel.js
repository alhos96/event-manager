const mongoose = require("mongoose");
const { Schema, Types, Decimal128, model } = mongoose;

exports.Event = model(
  "Event",
  new Schema(
    {
      title: String,
      description: String,
      price: Number,
      date: Date,
      category: String,
      image: String,
      creator: String,
      registrationRequests: [
        {
          userWhoRegistered: { type: String },
          isAnswered: { type: Boolean, default: false },
          status: { type: String, default: "Pending" },
        },
      ],
    },
    { timestamps: true }
  )
);
