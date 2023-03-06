import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUI from "swagger-ui-express";
import swaggerDocumentation from "./swagger/index.swagger";
import database from "./config/database.config";
import rootRoute from "./routes/index.route";
import constant from "./config/constants.config";

const app = express();
const PORT = constant.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
app.use("/api/v1", rootRoute);

app.listen(PORT, () => {
    database();
    console.log(`Server started on port: ${PORT}`);
});
