import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

const PORT = process.env.PORT || 8000;

dotenv.config({
    path : "./.env"
});

connectDB()
    .then(() => {
        app.listen(PORT , () =>{
            console.log(`Server is running in http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.log("Failed to connect to MongoDB", error)
    })
    