import { characterStore } from "../store/characterStore";
import { ICharacter } from "../types/character";
import { useState, ChangeEvent } from "react";

export function useCharacterFuntion() {
  const {
    page,
    limit,
    totalPages,
    totalCharacters,
    getAllCharacter,
    getIdCharacter,
    createCharacter,
    updateCharacter,
    deleteCharacter,
  } = characterStore();

  const [characterData, setCharacterData] = useState({
    id: Number(totalCharacters) + 1,
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
    image: "",
    created: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: keyof ICharacter
  ): void => {
    const { value } = e.target;
    setCharacterData({ ...characterData, [fieldName]: value });
  };

  const onSubmitCharacter = async (data: ICharacter) => {
    try {
      await createCharacter(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onUpdateCharacter = async (data: ICharacter) => {
    try {
      await updateCharacter(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onDeleteCharacter = async (data: ICharacter) => {
    try {
      await deleteCharacter(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onGetCharacterId = async (id: number) => {
    try {
      await getIdCharacter(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page: number) => {
    const dataSearch = { page, limit };
    getAllCharacter(dataSearch);
  };

  const handlePerRowsChange = (limit: number) => {
    const dataSearch = { page, limit };
    getAllCharacter(dataSearch);
  };

  return {
    totalPages,
    handleChange,
    onSubmitCharacter,
    onUpdateCharacter,
    onDeleteCharacter,
    onGetCharacterId,
    handlePageChange,
    handlePerRowsChange,
  };
}
