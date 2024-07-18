import React, { useEffect, useRef, useState } from "react";
import DivParent from "../components/DivParent";
import DivCentered from "../components/DivCentered";
import Header from "../components/Header";
import { PiGenderMaleBold, PiGenderFemaleBold } from "react-icons/pi";
import { FaMedal } from "react-icons/fa6";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useGetEntries from "../hooks/useGetEntries";
import { useUserContext } from "../contexts/UserContextProvider";
import classNames from "classnames";

function Leaderboard() {
  const { theme } = useUserContext();
  const { addEntriesFunction, isLoading } = useGetEntries();
  const [leaderboard, setLeaderboard] = useState([]);
  const [mode, setMode] = useState("easy");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = leaderboard.slice(indexOfFirstEntry, indexOfLastEntry);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(leaderboard.length / entriesPerPage))
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    setCurrentPage(1);
    const getLeaderboard = async () => {
      try {
        const response = await addEntriesFunction(mode);
        // console.log(response);

        setLeaderboard(response);
      } catch (error) {
        console.log(error);
      }
    };

    getLeaderboard();
  }, [mode]);

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

  const selectTheme = () => {
    if (theme === "blue") return "bg-customBlue/80";
    if (theme === "red") return "bg-customRed/80";
    if (theme === "green") return "bg-customGreen/80";
    if (theme === "cyan") return "bg-customCyan/80";
  };

  return (
    <DivParent>
      <DivCentered>
        <Header>
          <h1 className="text-xl font-semibold tracking-wider">Leaderboard</h1>

          <div ref={menuRef} className="relative ml-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-4 py-2 capitalize transition-all rounded-lg outline outline-1 outline-white/15 active:scale-95">
              {mode} mode
            </button>

            {isMenuOpen && (
              <div
                className={classNames(
                  "absolute right-0 mt-2 rounded-lg   outline-1 outline outline-white/15",
                  selectTheme()
                )}>
                <p
                  onClick={() => {
                    setMode("easy");
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-1 cursor-pointer text-nowrap hover:bg-white/5 font-light">
                  Easy Mode
                </p>
                <p
                  onClick={() => {
                    setMode("medium");
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-1 cursor-pointer text-nowrap hover:bg-white/5 font-light">
                  Medium Mode
                </p>
                <p
                  onClick={() => {
                    setMode("hard");
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-1 cursor-pointer text-nowrap hover:bg-white/5 font-light">
                  Hard Mode
                </p>
              </div>
            )}
          </div>
        </Header>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 p-8 ">
            <span className="loading loading-spinner loading-sm"></span>
            <p>Loading</p>
          </div>
        ) : (
          <>
            <div className="p-4 mt-4 overflow-hidden rounded-lg outline outline-1 outline-white/10 bg-black/10">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/15">
                    <th></th>
                    <th></th>
                    <th className="w-full pb-2 text-base font-semibold text-start">
                      Username
                    </th>
                    <th className="flex items-center justify-center gap-1 pb-2 text-base font-semibold text-center">
                      <FaStar className="text-yellow-500" />
                      Stars
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.map((user, index) => (
                    <tr
                      key={index + 1}
                      className="font-light hover:bg-white/5 hover:text-white ">
                      <td className="text-xs text-white/40">
                        <p className="flex items-center justify-center w-8 ">
                          {indexOfFirstEntry + index + 1 <= 3 ? (
                            <FaMedal
                              className={classNames("text-lg", {
                                "text-amber-500":
                                  indexOfFirstEntry + index + 1 === 1,
                                "text-slate-400":
                                  indexOfFirstEntry + index + 1 === 2,
                                "text-orange-700":
                                  indexOfFirstEntry + index + 1 === 3,
                              })}
                            />
                          ) : (
                            indexOfFirstEntry + index + 1
                          )}
                        </p>
                      </td>
                      <td>
                        <p className="flex justify-center pr-2">
                          {user.gender ? (
                            <PiGenderMaleBold className="text-lg text-blue-500 " />
                          ) : (
                            <PiGenderFemaleBold className="text-lg text-pink-500" />
                          )}
                        </p>
                      </td>
                      <td className="text-start">{user.username}</td>
                      <td className="text-center">{user.stars}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-center gap-8 mt-4">
              <button
                onClick={handlePrevPage}
                className="p-3 transition-all rounded-full hover:bg-white/10 active:scale-90 hover:text-white">
                <FaArrowLeft />
              </button>

              <p className="w-12 text-base font-semibold text-center ">
                {currentPage}
              </p>

              <button
                onClick={handleNextPage}
                className="p-3 transition-all rounded-full hover:bg-white/10 active:scale-90 hover:text-white">
                <FaArrowRight />
              </button>
            </div>
          </>
        )}
      </DivCentered>
    </DivParent>
  );
}

export default Leaderboard;
