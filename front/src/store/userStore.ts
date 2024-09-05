import { create } from "zustand";
import axios, { AxiosResponse, AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

interface UserStoreAttributes {
  createUser: (data: object) => Promise<void>;
  loginUser: (data: object) => Promise<void>;
  auth: boolean;
  token: string;
  username: string;
}

export const userStore = create<UserStoreAttributes>((set) => ({
  auth: false,
  token: "",
  username: "",
  createUser: async (data) => {
    const response: AxiosResponse<{ username: string }> =
      await axiosInstance.post("/user/create", data);
    set({ username: response.data.username });
  },
  loginUser: async (data) => {
    const response: AxiosResponse<{
      username: string;
      auth: boolean;
      token: string;
    }> = await axiosInstance.post("/user/login", data);
    set({
      auth: response.data.auth,
      token: response.data.token,
      username: response.data.username,
    });
  },
}));
