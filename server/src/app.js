import  express  from "express";
import apiRoute, { apiProtected } from "./routes/api.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";

import cors from "cors";
import ConnectDB from "./config/db.js";

const app = express();

const PORT=8000;

ConnectDB()

app.use(cors());
app.use(express.json());  // either we use body-parser by importing and using it app.use(bodyparser.json());
app.use('/api/',apiRoute);
app.use('/api/',AuthMiddleware,apiProtected);


app.listen(PORT,()=>{
    console.log("server is running");
})