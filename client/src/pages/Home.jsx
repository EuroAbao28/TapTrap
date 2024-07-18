import React, { useEffect, useRef, useState } from "react";
import { SiSquare } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import ButtonMode from "../components/ButtonMode";
import DivParent from "../components/DivParent";
import DivCentered from "../components/DivCentered";
import { RiTrophyLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { useUserContext } from "../contexts/UserContextProvider";
import { LuPaintbrush2 } from "react-icons/lu";
import logo from "../assets/logo.png";
import { PiPaintBrushBroad } from "react-icons/pi";
import classNames from "classnames";

function Home() {
  const navigate = useNavigate();

  const { user, theme, updateTheme } = useUserContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const selectTheme = () => {
    if (theme === "blue") return "bg-customBlue/80";
    if (theme === "red") return "bg-customRed/80";
    if (theme === "green") return "bg-customGreen/80";
    if (theme === "cyan") return "bg-customCyan/80";
  };

  // for auto closing the menu
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DivParent>
      <DivCentered>
        <header className="flex items-center justify-between pb-4 border-b sm:gap-2 border-white/15">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-8" />
            <h1 className="text-3xl font-semibold cursor-default tracking-wider">
              TapTrap
            </h1>
          </div>

          <div
            onClick={() => navigate("/profile")}
            className="p-2 ml-auto text-2xl transition-all cursor-pointer rounded-xl hover:bg-white/10 hover:text-white active:scale-90">
            <FiUser />
          </div>
          <div
            onClick={() => navigate("/leaderboard")}
            className="p-2 text-2xl transition-all cursor-pointer rounded-xl hover:bg-white/10 active:scale-90 hover:text-white">
            <RiTrophyLine />
          </div>

          <div ref={menuRef} className="relative">
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-2xl transition-all cursor-pointer rounded-xl hover:bg-white/10 hover:text-white active:scale-95">
              <PiPaintBrushBroad />
            </div>

            {isMenuOpen && (
              <div
                className={classNames(
                  "absolute right-0 mt-2 rounded-lg outline-1 outline outline-white/15",
                  selectTheme()
                )}>
                <p
                  onClick={() => {
                    updateTheme("blue");
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-1 cursor-pointer text-nowrap hover:bg-white/5 font-light">
                  Mystic Blue
                </p>
                <p
                  onClick={() => {
                    updateTheme("red");
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-1 cursor-pointer text-nowrap hover:bg-white/5 font-light">
                  Candy Red
                </p>
                <p
                  onClick={() => {
                    updateTheme("green");
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-1 cursor-pointer text-nowrap hover:bg-white/5 font-light">
                  Apple Green
                </p>
                <p
                  onClick={() => {
                    updateTheme("cyan");
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-1 cursor-pointer text-nowrap hover:bg-white/5 font-light">
                  Super Cyan
                </p>
              </div>
            )}
          </div>
        </header>
        <menu className="flex flex-col items-center gap-4 mt-6">
          <ButtonMode mode={"easy"} />
          <ButtonMode mode={"medium"} />
          <ButtonMode mode={"hard"} />
        </menu>
        <footer className="flex flex-col items-center mt-6 opacity-60">
          <h3 className="text-sm tracking-wider">Euro Abao</h3>
          <p className="-mt-1 font-light text-xxs">Developed by</p>
        </footer>
      </DivCentered>
    </DivParent>
  );
}

export default Home;
