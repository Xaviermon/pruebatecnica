import { Router } from "express";
import {
  getCharacters,
  createCharacter,
  getCharacterId,
  updateCharacterHandler,
  deleteCharacterHandler,
} from "../handlers/character.handler";
const characterRouter = Router();

characterRouter.get("/get-all", getCharacters);
characterRouter.get("/get/:id", getCharacterId);
characterRouter.post("/create", createCharacter);
characterRouter.put("/update", updateCharacterHandler);
characterRouter.delete("/delete", deleteCharacterHandler);

export default characterRouter;
