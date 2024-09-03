import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDb from "./config/db"

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.redirect("/api")
})

app.get("/api", (req, res) => {
    res.send("Welcome to the API");
});

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
}).catch(error => {
    console.error('Error al conectar a MongoDB: ', error.message)
})