import mongoose from "mongoose";

const db = {
  connect: (DB_HOST) => {
    //mongoose.set("useNewUrlParser", true);
    //mongoose.set("useFindAndModify", false);
    //mongoose.set("useCreateIndex", true);
    //mongoose.set("useUnifiedTopology", true);
    mongoose.set("strictQuery", false);
    
    mongoose.connect(process.env.DB_HOST);
    mongoose.connection.on("error", (err) => {
      console.log(err);
      console.log(
        "MongoDB connect error. Please make sure MongoDB is running."
      );
      process.exit();
    });
  },

  close: () => {
    mongoose.connection.close();
  },
};

export default db;
