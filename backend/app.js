import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Backend is running!")
})

app.listen(4000, () => [
    console.log("Server started on http://localhost:4000")
])