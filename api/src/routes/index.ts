import { Router } from "express";
import characterRouter from "../routes/character.router";
import userRouter from "./user.router";

const router = Router();
router.use("/character", characterRouter);
router.use("/user", userRouter);

export default router;
