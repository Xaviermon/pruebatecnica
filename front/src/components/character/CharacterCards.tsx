import React, { useState, useEffect } from "react";
import { useCharacterHook } from "../../hooks/characterHook/useCharacterHook";
import { UpdateCharacterModal } from "./ModalUpdate";
import { ICharacter } from "../../types/character";

interface CharacterListProps {
  openModal: () => void; // Función para abrir el modal
}

export const CharacterList: React.FC<CharacterListProps> = ({ openModal }) => {
  const {
    characters,
    handlePageChange,
    onDeleteCharacter,
    onUpdateCharacter,
    onGetCharacterId,
  } = useCharacterHook();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

  useEffect(() => {
    handlePageChange(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleDelete = (id: number) => {
    onDeleteCharacter(id);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const openUpdateModal = (id: number) => {
    onGetCharacterId(id);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleUpdateCharacter = (data: ICharacter) => {
    onUpdateCharacter(data);
  };

  return (
    <div className="p-4 bg-white mt-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-500">
          Rick and Morty Characters
        </h1>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create New Character
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((character) => (
          <div key={character.id} className="bg-blue-100 p-4 rounded shadow-md">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-40 object-cover rounded"
            />
            <div className="mt-4 text-blue-800">
              <h2 className="text-lg font-bold">{character.name}</h2>
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
              {character.type && <p>Type: {character.type}</p>}
              <p>Gender: {character.gender}</p>
            </div>
            <button
              onClick={() => handleDelete(character.id)}
              className="bg-red-500 text-white py-1 px-3 mt-4 rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => openUpdateModal(character.id)}
              className="bg-blue-500 text-white py-1 px-3 mt-4 rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-blue-500">Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>

      {isUpdateModalOpen && (
        <UpdateCharacterModal
          closeModal={closeUpdateModal}
          onUpdateCharacter={handleUpdateCharacter}
        />
      )}
    </div>
  );
};
