import Character from "../models/character.model";
import axios from "axios";

export const dataInit = async () => {
  const json = await axios.get("https://rickandmortyapi.com/api/character") 
  const response = json.data;

  const characters = response.results;

  if (!characters) {
    throw new Error("No se encontraron resultados de personajes");
  }

  for (const character of characters) {
    const filter = { _id: character.id };

    const characterApi = new Character({
      _id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      type: character.type,
      gender: character.gender,
      image: character.image,
      created: false,
    });

    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    await Character.findOneAndUpdate(filter, characterApi, options);
  }

  const charactersInit = await Character.find();

  console.log("Successfully synchronized characters");

  return charactersInit;
};
