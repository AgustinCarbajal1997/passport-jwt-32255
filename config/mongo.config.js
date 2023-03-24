const mongoose = require("mongoose");

mongoose
  .connect("")
  .then(() => console.log("Successfull connection to database"))
  .catch((error) => console.log(`Something gone wrong. ${error}`));
