import { create } from "zustand";
import axios, { AxiosResponse, AxiosInstance } from "axios";
import { ICharacter } from "../types/character";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

interface CharacterStoreAttributes {
  characters: ICharacter[];
  character: ICharacter;
  page: number;
  limit: number;
  totalPages: number;
  totalCharacters: number;
  getAllCharacter: (data: { page: number; limit: number }) => Promise<void>;
  getIdCharacter: (id: number) => Promise<void>;
  createCharacter: (data: ICharacter) => Promise<void>;
  updateCharacter: (data: ICharacter) => Promise<void>;
  deleteCharacter: (data: number) => Promise<void>;
}

export const characterStore = create<CharacterStoreAttributes>((set, get) => ({
  characters: [],
  character: {
    id: 0,
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
    image: "",
    created: false,
  },
  page: 1,
  limit: 10,
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
    const response: AxiosResponse = await axiosInstance.get(
      `/character/get/${id}`
    );

    set({ character: response.data });
  },
  createCharacter: async (data) => {
    const response: AxiosResponse = await axiosInstance.post(
      "/character/create",
      data
    );
    console.log(response.data);

    set((state) => ({
      characters: [...state.characters, response.data],
    }));
  },
  updateCharacter: async (data) => {
    const response: AxiosResponse = await axiosInstance.put(
      `/character/update/${data.id}`,
      data
    );
    const { characters } = get();
    const updatedCharacters = characters.map((character) =>
      character._id === data.id ? response.data : character
    );
    set({ characters: updatedCharacters });
    console.log(`Updated character: ${response.data.name}`);
  },
  deleteCharacter: async (id) => {
    const response: AxiosResponse = await axiosInstance.delete(
      `/character/delete/${id}`
    );
    const { characters } = get();
    const updatedCharacters = characters.filter(
      (character) => character._id !== id
    );
    set({ characters: updatedCharacters });
    console.log(`delete ${response.data}`);
  },
}));
