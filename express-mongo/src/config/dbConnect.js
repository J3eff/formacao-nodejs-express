import mongoose from "mongoose";

async function conectDataBase() {
    mongoose.connect("mongodb+srv://admin:admin@cluster0.lt6dufk.mongodb.net/livraria?retryWrites=true&w=majority")

    return mongoose.connection;
}

export default conectDataBase;