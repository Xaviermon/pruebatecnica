import { Router } from "express";
import characterRouter from "../routes/character.router"

const router = Router();

router.use("/character", characterRouter)

export default router;
