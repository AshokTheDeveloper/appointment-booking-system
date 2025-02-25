const mongoose = require("mongoose");

const initializeDBAndServer = async (app) => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI);
    console.log("Database connected successfully");

    const PORT = process.env.PORT || 3003;
    app.listen(PORT, () => {
      console.log(`Server started and listens on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error Database connection failed");
  }
};

module.exports = initializeDBAndServer;
