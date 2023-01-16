const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://Devendra:aman@cluster0.hvz3gnm.mongodb.net/socialmediaapp?retryWrites=true&w=majority"
);

module.exports = {
  connection,
};
