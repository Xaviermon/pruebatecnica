import { useUserFunction } from "./useUserFunction";

export function useUserHook() {
  const {
    serUserLogin,
    auth,
    token,
    username,
    handleChange,
    onSubmitUser,
    loginUserSubmit,
    userLogin,
  } = useUserFunction();

  return {
    auth,
    token,
    username,
    handleChange,
    onSubmitUser,
    loginUserSubmit,
    userLogin,
    serUserLogin
  };
}
