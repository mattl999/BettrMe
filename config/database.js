const mongoose = require("mongoose");

//local DB String from .env
//DATABASE_URL=mongodb://127.0.0.1:27017/BettrMe
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});
// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
