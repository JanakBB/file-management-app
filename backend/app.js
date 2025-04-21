import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: "Something went wrong!"})
});

app.listen(4000, () => [
  console.log("Server started on http://localhost:4000"),
]);
