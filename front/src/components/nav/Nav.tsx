import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../../assets/asset/images/HOWS-ADVISOR-blanco.png";
import { BarsNav } from "../../assets/Icons";

interface NavBarProps {
  setIsLoggedIn: (data: boolean) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ setIsLoggedIn }) => {
  const lastScrollTop = useRef(0);
  const [isNavBarVisible, setIsNavBarVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sessionExpirate = localStorage.getItem("expirate");

  const handleScroll = () => {
    const { pageYOffset } = window;
    if (pageYOffset > lastScrollTop.current) {
      setIsNavBarVisible(false);
    } else if (pageYOffset < lastScrollTop.current) {
      setIsNavBarVisible(true);
    }
    lastScrollTop.current = pageYOffset;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSession = () => {
    localStorage.setItem("expirate", "true");
    localStorage.setItem("token", "");
    setIsLoggedIn(true);
    toggleMobileMenu();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="absolute z-10">
      <nav
        className={`fixed top-0 left-0 transform ${
          isNavBarVisible ? "translate-y-0" : "-translate-y-72"
        } flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 w-full h-16 shadow-md bg-[#3889F2] transition-transform duration-300`}
      >
        <Link to="/" className="text-white ml-4">
          <img
            src={logoImage}
            alt="Logo"
            className="w-20 h-20 object-contain"
          />
        </Link>
        <div
          className={`hidden md:flex items-center gap-12 mr-8 ${
            isMobileMenuOpen ? "hidden" : ""
          }`}
        >
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/zipcodeconstructor" className="text-white">
            Register
          </Link>
          <Link to="/blog" className="text-white">
            Blog
          </Link>

          {sessionExpirate === "true" ? (
            <Link
              to="/siginconstructorpage"
              onClick={toggleMobileMenu}
              className="text-white"
            >
              Log In
            </Link>
          ) : (
            <Link to="/" onClick={handleSession} className="text-white">
              Log out
            </Link>
          )}
        </div>
        <div
          className={`md:hidden ${
            isMobileMenuOpen ? "block" : "hidden"
          } fixed top-0 left-0 w-full h-screen bg-[#3889F2] bg-opacity-90 z-50`}
        >
          <div className="flex flex-col gap-12 items-center pt-16">
            <Link to="/" onClick={toggleMobileMenu} className="text-white">
              Home
            </Link>
            <Link
              to="/zipcodeconstructor"
              onClick={toggleMobileMenu}
              className="text-white"
            >
              Register
            </Link>
            <Link
              to="/ruta-adicional"
              onClick={toggleMobileMenu}
              className="text-white"
            >
              Ruta adicional
            </Link>
            {sessionExpirate === "true" ? (
              <Link
                to="/siginconstructorpage"
                onClick={toggleMobileMenu}
                className="text-white"
              >
                Log In
              </Link>
            ) : (
              <Link to="/" onClick={handleSession} className="text-white">
                Log out
              </Link>
            )}
          </div>
        </div>
        <div className="md:hidden z-50 mr-4">
          <div className="cursor-pointer" onClick={toggleMobileMenu}>
            <BarsNav />
          </div>
        </div>
      </nav>
    </div>
  );
};
