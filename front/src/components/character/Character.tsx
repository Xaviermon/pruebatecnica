import { CharacterList } from "./CharacterCards";
import { CreateCharacterModal } from "./Modal";
import { useState } from "react";

export const Character = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div>
      <CharacterList openModal={openModal} />
      {isModalOpen && <CreateCharacterModal closeModal={closeModal} />}
    </div>
  );
};
