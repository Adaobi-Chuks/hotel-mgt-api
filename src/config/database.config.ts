import mongoose from "mongoose";
mongoose.set("strictQuery", true);
import constants from "./constants.config";

export default function database() {
    mongoose.connect(constants.DATABASE_URI!)
        .then(() => {
            console.log(constants.MESSAGES.DATABASE.CONNECTED);
        })
        .catch((err) => {
            console.log(constants.MESSAGES.DATABASE.ERROR, err);
        });
}