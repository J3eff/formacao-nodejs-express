import mongoose from "mongoose";

async function conectDataBase() {
  mongoose.connect(process.env.DB_CONNECTION);

  return mongoose.connection;
}

export default conectDataBase;