import mongoose from 'mongoose';

const DATABASE_URL: string = process.env.DATABASE_URL || "";

const connectDatabase = () => {
  mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const db: mongoose.Connection = mongoose.connection;

  db.once("open", async () => {
    console.log("Connection successful.");
  });

  db.on("error", () => {
    console.log("Connection failed.");
  });
};

export default connectDatabase;
