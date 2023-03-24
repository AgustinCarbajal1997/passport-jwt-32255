const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://magustincarbajal97:NXwUMBbedSFQhGID@cluster0.xkitr.mongodb.net/usersCoder?retryWrites=true&w=majority"
  )
  .then(() => console.log("Successfull connection to database"))
  .catch((error) => console.log(`Something gone wrong. ${error}`));
