require("dotenv").config();

const config = {
  port: process.env.PORT || 5000,
  mongo: process.env.MONGO_URI || `mongodb://localhost:27017/cookbook`,
  secret: process.env.JWT_SECRET || "paragonfullstackmistral",
};

module.exports = config;
