import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db";
import router from "./routes";
import { setupSwagger } from './config/swagger';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
setupSwagger(app);

app.get("/", (req, res) => {
  res.redirect("/api");
});

app.get("/api", (req, res) => {
  res.send("Welcome to the API ");
});


app.use(router)

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB: ", error.message);
  });
