import { useCharacter } from "./useCharacter";
import { useCharacterFuntion } from "./useCharacterFunction";

export function useCharacterHook() {
  const { characters } = useCharacter();

  const {
    totalPages,
    handleChange,
    onSubmitCharacter,
    onUpdateCharacter,
    onDeleteCharacter,
    onGetCharacterId,
    handlePageChange,
    handlePerRowsChange,
    characterData,
    setCharacterData,
    character
  } = useCharacterFuntion();

  return {
    totalPages,
    handleChange,
    onSubmitCharacter,
    onUpdateCharacter,
    onDeleteCharacter,
    onGetCharacterId,
    handlePageChange,
    handlePerRowsChange,
    characters,
    characterData,
    setCharacterData,
    character
  };
}
