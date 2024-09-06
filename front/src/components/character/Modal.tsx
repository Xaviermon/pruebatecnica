import { useCharacterHook } from '../../hooks/characterHook/useCharacterHook';

interface CreateCharacterModalProps {
  closeModal: () => void;
}

export const CreateCharacterModal: React.FC<CreateCharacterModalProps> = ({ closeModal }) => {
  const { characterData, handleChange, onSubmitCharacter, setCharacterData } = useCharacterHook()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitCharacter(characterData)
    closeModal()
    setCharacterData({
      id: 0,
      name: "",
      status: "",
      species: "",
      type: "",
      gender: "",
      image: "",
      created: true,
    })
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Create New Character</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={characterData.name}
              onChange={(e) => handleChange(e, "name")}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Status</label>
            <input
              type="text"
              value={characterData.status}
              onChange={(e) => handleChange(e, "status")}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Species</label>
            <input
              type="text"
              value={characterData.species}
              onChange={(e) => handleChange(e, "species")}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Type (Optional)</label>
            <input
              type="text"
              value={characterData.type}
              onChange={(e) => handleChange(e, "type")}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700">Gender</label>
            <input
              type="text"
              value={characterData.gender}
              onChange={(e) => handleChange(e, "gender")}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Image URL</label>
            <input
              type="url"
              value={characterData.image}
              onChange={(e) => handleChange(e, "image")}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 `}
            >
              create Character
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

