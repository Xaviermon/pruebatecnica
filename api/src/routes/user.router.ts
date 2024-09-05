import { Router } from "express";
import { loginUser, createUser } from "../handlers/user.handler";

const userRouter = Router();
userRouter.post("/login", loginUser);
userRouter.post("/create", createUser);

export default userRouter;
