import mongoose from "mongoose";
import { DB_CONNECT } from "../utils/constants.js";

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
    
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default ConnectDB