import { Router } from "express";
import { getCharacters, createCharacter } from "../handlers/character.handler";
const characterRouter = Router();

characterRouter.get("/get-all", getCharacters);
characterRouter.post("/create", createCharacter)

export default characterRouter;
