import { Request, Response } from "express";
import { getCharactersFromDb, addCharacter, getById } from "../controllers/character.controller";
import { ICharacter } from "../models/character.model";

export const getCharacters = async (req: Request, res: Response): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const data = await getCharactersFromDb(page, limit);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los personajes", error: (error as Error).message });
  }
};

export const createCharacter = async(req: Request, res:Response): Promise<Response> => {
  try {
    const { id, name, status, species, type, gender, image, created }: ICharacter = req.body

    const newCharacter = await addCharacter(id, name, status, species, type, gender, image, created);
    return res.status(201).json(newCharacter);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los personajes", error: (error as Error).message });
  }
}

export const getCharacterId = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id as string)
    const character = await getById(id)
    return res.status(200).json(character)
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los personajes", error: (error as Error).message });
  }
}

export const updateCharacterHandler = async (req: Request, res: Response) => {
}