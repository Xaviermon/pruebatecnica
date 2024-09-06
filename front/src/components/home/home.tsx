import { Route, Routes } from "react-router-dom";
import { LoginUser } from "../user/LoginUser";
import { Character } from "../character/Character";
import { RegisterUser } from "../user/RegisterUser";
import { NavBar } from "../nav/Nav";
import { Footer } from "../footer/Footer";

export const Home = () => {
  return (
    <>
    <NavBar />
      <Routes>
        <Route path="/" element={<LoginUser />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/characters" element={<Character />} />
      </Routes>
    <Footer />  
    </>
  );
};
