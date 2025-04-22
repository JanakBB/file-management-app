import express from "express";
import cors from "cors";

import userRouters from "./routes/userRoutes.js";
import directoryRouters from "./routes/directoryRoutes.js"
import fileRouters from "./routes/fileRoutes.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouters);
app.use("/directory", directoryRouters)
app.use("/file", fileRouters)


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: "Something went wrong!"})
});

app.listen(4000, () => console.log("Server is running"));
