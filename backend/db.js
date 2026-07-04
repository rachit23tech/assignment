import moongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
moongoose.connect(process.env.MONGO_URI, {dbName: "evoltsoft-assignment"})
.then(() => {
    console.log("Database connected");
})
.catch((err) => {
    console.log(err);
});
export default moongoose;