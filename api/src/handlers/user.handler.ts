import { Request, Response } from "express";
import { validateUser, registerUser } from "../controllers/user.controller";
import { generateToken } from "../utils/jwt";
import { IUser } from "../models/user.model";

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { username, password }: IUser = req.body;
    const valUser = await validateUser(username, password);
    const createToken = generateToken(valUser.id);

    return res.status(200).json({
      username: valUser.username,
      auth: true,
      token: createToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los personajes",
      error: (error as Error).message,
    });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { username, password }: IUser = req.body;
    const newUser = await registerUser(username, password);
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los personajes",
      error: (error as Error).message,
    });
  }
};
