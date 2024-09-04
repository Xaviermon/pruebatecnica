import Character from "../models/character.model";
import { ICharacter } from "../models/character.model";

export const getCharactersFromDb = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const characters = await Character.find().skip(skip).limit(limit).exec();

  const total = await Character.countDocuments();
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    totalPages,
    totalCharacters: total,
    characters,
  };
};

export const getById = async (id: number): Promise<ICharacter> => {
  const character = await Character.findById(id);
  if (!character) {
    throw new Error(`Character with id ${id} not found`);
  }
  return character;
};

export const addCharacter = async (
  _id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  image: string,
  created: boolean
): Promise<ICharacter> => {
  const character = new Character({
    _id,
    name,
    status,
    species,
    type,
    gender,
    image,
    created,
  });
  await character.save();

  return character;
};

export const updateCharacter = async (
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  image: string,
  created: boolean
): Promise<ICharacter> => {
  const updateCharacter = await Character.findByIdAndUpdate(
    id,
    {
      name,
      status,
      species,
      type,
      gender,
      image,
      created,
    },
    { new: true }
  );
  if (!updateCharacter) {
    throw new Error(`Character with id ${id} not found`);
  }
  return updateCharacter;
};

export const deleteCharacter = async (id: number) => {
  const findCharacter = await getById(id);
  if (!findCharacter)
    throw new Error("This ID does not correspond to any character");

  await Character.findByIdAndDelete(id);
  return findCharacter;
};
