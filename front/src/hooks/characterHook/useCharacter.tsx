import { useEffect, useState } from "react";
import { characterStore } from "../../store/characterStore";
import { ICharacter } from "../../types/character";


export function useCharacter() {
  const { characters: charactersData } = characterStore()
  const [characters, setCharacter] = useState<ICharacter[]>([])

  useEffect(() => {
    const newCharacters = charactersData.map((item) => ({
      id: item._id || 0,
      name: item.name,
      status: item.status,
      species: item.species,
      type: item.type,
      gender: item.gender,
      image: item.image,
      created: item.created
    }))
    setCharacter(newCharacters)
  }, [charactersData])

  return {
    characters
  }
}
