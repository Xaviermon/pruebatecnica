import User from "../models/user.model";
import { IUser } from "../models/user.model";
import crypto from "crypto-js";

export const validateUser = async (
  username: string,
  password: string
): Promise<IUser> => {
  const validateUser = await User.findOne({ username });
  if (!validateUser) throw new Error("Invalid username");

  const userPass = crypto.SHA256(password).toString();

  const passwordValidate = userPass === validateUser.password;

  if (!passwordValidate) throw new Error("Invalid password");
  return validateUser;
};

export const registerUser = async(username: string, password: string): Promise<IUser> => {
  const hashPassword = crypto.SHA256(password).toString()
  const newUser = new User({ username, password: hashPassword })
  await newUser.save()
  return newUser
}
