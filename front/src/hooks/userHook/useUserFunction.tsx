import { userStore } from "../../store/userStore";
import { IUser } from "../../types/character";
import { useState, ChangeEvent } from "react";

export function useUserFunction() {
  const {
    auth,
    token,
    username,
    createUser,
    loginUser
  } = userStore()

  const [userLogin, serUserLogin] = useState({
    username: "",
    password: ""
  })
  console.log(userLogin);
  
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: string
  ): void => {
    const { value } = e.target;
    serUserLogin({ ...userLogin, [fieldName]: value });
  };

  const onSubmitUser = async(data: IUser) => {
    try {
      await createUser(data)
    } catch (error) {
      console.log(error);
    }
  }

  const loginUserSubmit = async(data: IUser) => {
    try {
      await loginUser(data)
    } catch (error) {
      console.log(error);
    }
  }
  return {
    auth,
    token,
    username,
    handleChange,
    onSubmitUser,
    loginUserSubmit,
    userLogin,
    serUserLogin
  }
}
