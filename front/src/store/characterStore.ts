import { create } from "zustand";
import axios, { AxiosResponse, AxiosInstance } from "axios";
import { ICharacter } from "../types/character";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

interface CharacterStoreAttributes {
  characters: ICharacter[];
  character: object;
  page: number;
  limit: number;
  totalPages: number;
  totalCharacters: number;
  getAllCharacter: (data: { page: number; limit: number }) => Promise<void>;
  getIdCharacter: (id: number) => Promise<void>;
  createCharacter: (data: ICharacter) => Promise<void>;
  updateCharacter: (data: ICharacter) => Promise<void>;
  deleteCharacter: (data: ICharacter) => Promise<void>;
}

export const characterStore = create<CharacterStoreAttributes>((set, get) => ({
  characters: [],
  character: {},
  page: 1,
  limit: 1,
  totalPages: 1,
  totalCharacters: 0,
  getAllCharacter: async (data) => {
    const { page, limit } = data;
    const response: AxiosResponse<{
      page: number;
      totalPages: number;
      totalCharacters: number;
      characters: ICharacter[];
    }> = await axiosInstance(`/character/get-all?page=${page}&limit=${limit}`);
    set({
      page: response.data.page,
      totalPages: response.data.totalPages,
      totalCharacters: response.data.totalCharacters,
      characters: response.data.characters,
    });
  },
  getIdCharacter: async (id) => {
    const response: AxiosResponse<{ character: ICharacter }> =
      await axiosInstance.post(`/character/${id}`);
    set({ character: response.data.character });
  },
  createCharacter: async (data) => {
    const response: AxiosResponse<{ character: ICharacter }> =
      await axiosInstance.post("/character/create", data);
    set((state) => ({
      characters: [...state.characters, response.data.character],
    }));
  },
  updateCharacter: async (data) => {
    const response: AxiosResponse<{ updateCharacter: ICharacter }> =
      await axiosInstance.put(`/character/update/${data.id}`, data);
    const { characters } = get();
    const newCharacter = structuredClone(characters);
    const indexCharacter = characters.findIndex((elem) => elem.id === data.id);

    newCharacter[indexCharacter] = response.data.updateCharacter;

    set({ characters: newCharacter });
  },
  deleteCharacter: async (data) => {
    const response: AxiosResponse<{ findCharacter: ICharacter }> =
      await axiosInstance.put(`/character/delete/${data.id}`, data);
    const { characters } = get();
    const newCharacter = structuredClone(characters);
    const indexCharacter = characters.findIndex((elem) => elem.id === data.id);

    newCharacter[indexCharacter] = response.data.findCharacter;

    set({ characters: newCharacter });
  },
}));
