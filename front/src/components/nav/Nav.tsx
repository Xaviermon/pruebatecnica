import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BarsNav } from "../../assets/Icons";

export const NavBar: React.FC = () => {
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
    toggleMobileMenu();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="z-10">
      <nav
        className={`fixed top-0 left-0 transform ${
          isNavBarVisible ? "translate-y-0" : "-translate-y-72"
        } flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 w-full h-16 shadow-md bg-[#3889F2] transition-transform duration-300`}
      >
        <div
          className={`hidden md:flex items-center gap-12 mr-8 ${
            isMobileMenuOpen ? "hidden" : ""
          }`}
        >
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/register-user" className="text-white">
            Register
          </Link>
          {sessionExpirate === "true" ? (
            <Link to="/" onClick={toggleMobileMenu} className="text-white">
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
              to="/register-user"
              onClick={toggleMobileMenu}
              className="text-white"
            >
              Register
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
