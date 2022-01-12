const mongoose = require("mongoose");
const { Schema, Types, model } = mongoose;
exports.User = model(
  "User",
  new Schema(
    {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      events: [{ type: Types.ObjectId, ref: "Event" }],
    },
    { timestamps: true }
  )
);
