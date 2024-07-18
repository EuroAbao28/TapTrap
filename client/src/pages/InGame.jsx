import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import DivParent from "../components/DivParent";
import DivCentered from "../components/DivCentered";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import classNames from "classnames";
import {
  FaPlay,
  FaRegHeart,
  FaHeart,
  FaStar,
  FaUser,
  FaHome,
} from "react-icons/fa";
import { FaRotateLeft } from "react-icons/fa6";
import { HiShare } from "react-icons/hi";
import { LuPartyPopper } from "react-icons/lu";
import { PiSmileySadLight } from "react-icons/pi";
import { useUserContext } from "../contexts/UserContextProvider";
import useAddEntry from "../hooks/useAddEntry";

function InGame() {
  const navigate = useNavigate();
  const { user, theme } = useUserContext();

  const mode = useLocation().pathname.replace(/^\//, "");

  let timeDelay = 0;
  let boxGrids = 0;

  if (mode === "easy") {
    timeDelay = 500;
    boxGrids = 9;
  } else if (mode === "medium") {
    timeDelay = 400;
    boxGrids = 16;
  } else if (mode === "hard") {
    timeDelay = 200;
    boxGrids = 25;
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // const [boxGrid, setBoxGrid] = useState(["", "", "", "", "", "", "", "", ""]);
  const [lightedBoxIndex, setLightedBoxIndex] = useState(null);

  const [generatedNumbers, setGeneratedNumbers] = useState([]);

  const [playerPoints, setPlayerPoints] = useState(0);
  const [playerLives, setPlayerLives] = useState([1, 1, 1]);
  const [playerAnswer, setPlayerAnswer] = useState([]);
  const [answerIndex, setAnswerIndex] = useState(0);

  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const [isClickable, setIsClickable] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isALreadyShared, setIsAlreadyShared] = useState(false);

  const { addEntryFunction, isLoading } = useAddEntry();
  const [notifShareMessage, setNotifShareMessage] = useState("");
  const [notifShareStatus, setNotifShareStatus] = useState("");

  useEffect(() => {
    AOS.init();
  }, []);

  // lighting the box
  //  const handleLightBox = async () => {
  //    // 1sec delay for lighting
  //    setTimeout(() => {
  //      for (let i = 0; i < generatedNumbers.length; i++) {
  //        // delay para isa isa ang pag light
  //        setTimeout(() => {
  //          console.log(`LightedBoxIndex: ${generatedNumbers[i]}`);
  //          setLightedBoxIndex(generatedNumbers[i]);

  //          // turn off the light box
  //          setTimeout(() => {
  //            setLightedBoxIndex(null);
  //          }, timeDelay / 2);
  //        }, i * timeDelay);
  //      }
  //    }, 1000);
  //  };
  const handleLightBox = async () => {
    // make sure the boxes are not clickable
    setIsClickable(false);

    // turn off the lights
    await delay(300);
    setIsCorrect(false);
    setIsWrong(false);

    await delay(700);

    for (let i = 0; i < generatedNumbers.length; i++) {
      // console.log(`LightedBoxIndex: ${generatedNumbers[i]}`);
      setLightedBoxIndex(generatedNumbers[i]);

      // turn off the light box
      await delay(timeDelay);
      setLightedBoxIndex(null);
      // console.log("the delay is", timeDelay);

      await delay(timeDelay / 2);
    }

    // make it clickable if the loop is ended
    setIsClickable(true);
  };

  // generate random number
  const handleGenerate = () => {
    // set to true if false
    if (!isGameStarted) {
      setIsGameStarted(true);
    }

    // make sure the boxes are not clickable
    setIsClickable(false);

    const newRandomNumber = Math.floor(Math.random() * boxGrids) + 1;
    setGeneratedNumbers((prev) => [...prev, newRandomNumber]);
  };

  // answer / clicking the box
  const handleClickBox = (index) => {
    // check if the isGameStarted
    if (!isGameStarted) return;

    // if may buhay pa at tama ang sagot
    if (index === generatedNumbers[answerIndex]) {
      // console.log(`RanNum: ${generatedNumbers[answerIndex]} Answer: ${index}`);

      setPlayerAnswer((prev) => [...prev, index]);
      setAnswerIndex((prev) => prev + 1);

      // check if the same length, then call the handleGenerate()
      if (playerAnswer.length + 1 === generatedNumbers.length) {
        // reset
        setAnswerIndex(0);
        setPlayerAnswer([]);

        // increment level and points
        setPlayerPoints((prev) => prev + 10);

        // turn green light
        setIsCorrect(true);

        // call the function
        handleGenerate();
      }
    } else {
      // returns the index of the last occurrence of 1 in the array
      const lastIndex = playerLives.lastIndexOf(1);

      // turn red light
      setIsWrong(true);

      // check muna if may buhay pa
      if (playerLives.filter((life) => life === 1).length === 1) {
        const newPlayerLives = [...playerLives];
        newPlayerLives[lastIndex] = 0;

        setPlayerLives(newPlayerLives);
        setAnswerIndex(0);
        setPlayerAnswer([]);
        setIsGameOver(true);

        // console.log("Game Over");

        return;
      }

      // if mali and sagot
      const newPlayerLives = [...playerLives];
      newPlayerLives[lastIndex] = 0;

      setPlayerLives(newPlayerLives);
      setAnswerIndex(0);
      setPlayerAnswer([]);

      // console.log("Ur answer is wrong");

      // call the function
      handleLightBox();
    }
  };

  // restarting game
  const handleRestartGame = () => {
    // console.log("Game Restarted");

    // resest about player
    setPlayerPoints(0);
    setPlayerLives([1, 1, 1]);
    setPlayerAnswer([]);
    setAnswerIndex(0);

    // reset others
    setGeneratedNumbers([]);
    setIsGameOver(false);
    setIsAlreadyShared(false);
    setNotifShareMessage("");
    setNotifShareStatus("");

    // generate
    handleGenerate();
  };

  const handleShare = async () => {
    try {
      const data = {
        username: user.username,
        gender: user.gender,
        stars: playerPoints,
        mode,
      };

      // set to true, to prevent from sharing again
      setIsAlreadyShared(true);

      const response = await addEntryFunction(data);

      // console.log(response);
      setNotifShareMessage(response.message);
      setNotifShareStatus(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  const [dummyUser, setDummyUser] = useState({
    username: "",
    gender: true,
    stars: 10,
    mode: "easy",
  });
  const testDummyShare = async (e) => {
    e.preventDefault();

    // console.log(dummyUser);

    try {
      const response = await addEntryFunction(dummyUser);

      console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  // light the box when generatedNumbers changes
  useEffect(() => {
    // console.log(generatedNumbers);
    handleLightBox();
  }, [generatedNumbers]);

  const selectTheme = () => {
    if (theme === "blue") return "bg-customBlue/70";
    if (theme === "red") return "bg-customRed/70";
    if (theme === "green") return "bg-customGreen/70";
    if (theme === "cyan") return "bg-customCyan/70";
  };

  return (
    <>
      <div
        className={classNames("modal", {
          "modal-open": isGameOver,
        })}
        role="dialog">
        <div
          className={classNames(
            " w-[22rem] mx-4 p-4 rounded-xl border-2 border-white/15",
            selectTheme()
          )}>
          <div className="flex items-center justify-center gap-2 pb-2 border-b border-white/15">
            <h1 className="text-2xl font-bold tracking-wider">Game Over</h1>
          </div>

          {/*share message  */}
          <div
            className={classNames(
              "flex gap-2 transition-all px-4  text-center justify-center items-center overflow-hidden mt-2 ",
              {
                "h-12": notifShareMessage,
                "h-0": !notifShareMessage,
                "text-yellow-500": notifShareStatus === "new",
                "text-green-500": notifShareStatus === "yes",
                "text-orange-500": notifShareStatus === "no",
              }
            )}>
            <p className="text-sm">
              {notifShareMessage}{" "}
              {notifShareStatus === "no" ? (
                <PiSmileySadLight className="inline-block text-lg " />
              ) : (
                <LuPartyPopper className="inline-block text-lg animate-wiggle" />
              )}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 text-lg">
            <FaStar className="text-sm text-yellow-500" />
            <p className="mr-auto">Score</p>
            <p>{playerPoints}</p>
          </div>
          <div className="flex items-center justify-between gap-2 text-lg">
            <FaUser className="text-sm text-blue-500" />
            <p className="mr-auto">Username</p>
            <p>{user.username}</p>
          </div>

          {/* modal buttons */}
          <div className="flex gap-2 mt-4 ">
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center flex-1 gap-1 p-3 text-lg transition-all rounded-md bg-white/10 hover:bg-white/15 active:scale-95">
              <FaHome />
            </button>
            <button
              onClick={handleRestartGame}
              className="flex items-center justify-center flex-1 gap-1 p-3 text-lg transition-all rounded-md active:scale-95 bg-white/10 hover:bg-white/15">
              <FaRotateLeft />
            </button>
            <button
              onClick={handleShare}
              disabled={
                isLoading || isALreadyShared || playerPoints === 0
                  ? true
                  : false
              }
              className="flex items-center justify-center flex-1 gap-1 p-3 text-lg transition-all rounded-md active:scale-95 bg-white/10 hover:bg-white/15">
              {isLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <HiShare />
              )}
            </button>
          </div>
        </div>
      </div>

      <DivParent>
        <DivCentered>
          <Header>
            <h1 className="text-xl font-semibold tracking-wider capitalize text-nowrap">
              {mode} Mode
            </h1>
            {isGameStarted ? (
              <>
                <div className="flex w-full gap-2 ml-auto sm:w-1/2">
                  <div className="flex items-center justify-center flex-1 gap-2 text-lg rounded-md outline outline-1 outline-white/15 bg-black/20">
                    {playerLives.map((life, index) =>
                      life === 1 ? (
                        <FaHeart key={index} className="text-red-500" />
                      ) : (
                        <FaRegHeart key={index} />
                      )
                    )}
                  </div>
                  <div className="flex items-center justify-center flex-1 gap-2 py-1 rounded-md outline outline-1 outline-white/15 bg-black/20">
                    <FaStar className="text-xl text-yellow-500" />
                    <p className="text-lg font-black">{playerPoints}</p>
                  </div>
                </div>
              </>
            ) : (
              <div
                onClick={handleGenerate}
                className="flex items-center gap-2 px-3 py-1 ml-auto transition-all rounded cursor-pointer bg-white/10 active:scale-95 hover:bg-white/15 hover:text-white">
                <FaPlay className="text-sm " />
                <p className="text-lg font-semibold">Start</p>
              </div>
            )}
          </Header>

          {/* <form
            onSubmit={testDummyShare}
            className="flex flex-wrap justify-center w-full gap-2 mt-4">
            <input
              type="text"
              placeholder="username"
              minLength={5}
              maxLength={15}
              onChange={(e) =>
                setDummyUser((prev) => ({ ...prev, username: e.target.value }))
              }
              className="px-2 py-1 rounded outline-none bg-black/20"
            />

            <select
              onChange={(e) =>
                setDummyUser((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
              className="px-2 py-1 border-none rounded appearance-none bg-black/20 ">
              <option value={true}>Male</option>
              <option value={false}>Female</option>
            </select>

            <select
              onChange={(e) =>
                setDummyUser((prev) => ({
                  ...prev,
                  stars: parseInt(e.target.value),
                }))
              }
              className="px-2 py-1 border-none rounded appearance-none bg-black/20 ">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="80">80</option>
              <option value="90">90</option>
              <option value="100">100</option>
              <option value="110">110</option>
              <option value="120">120</option>
              <option value="130">130</option>
              <option value="140">140</option>
              <option value="150">150</option>
              <option value="160">160</option>
              <option value="170">170</option>
              <option value="180">180</option>
              <option value="190">190</option>
              <option value="200">200</option>
              <option value="210">210</option>
              <option value="220">220</option>
              <option value="230">230</option>
              <option value="240">240</option>
              <option value="250">250</option>
              <option value="260">260</option>
              <option value="270">270</option>
              <option value="280">280</option>
              <option value="290">290</option>
              <option value="300">300</option>
              <option value="310">310</option>
              <option value="320">320</option>
              <option value="330">330</option>
              <option value="340">340</option>
              <option value="350">350</option>
              <option value="360">360</option>
              <option value="370">370</option>
              <option value="380">380</option>
              <option value="390">390</option>
              <option value="400">400</option>
              <option value="410">410</option>
              <option value="420">420</option>
              <option value="430">430</option>
              <option value="440">440</option>
              <option value="450">450</option>
              <option value="460">460</option>
              <option value="470">470</option>
              <option value="480">480</option>
              <option value="490">490</option>
              <option value="500">500</option>
              <option value="510">510</option>
              <option value="520">520</option>
              <option value="530">530</option>
              <option value="540">540</option>
              <option value="550">550</option>
              <option value="560">560</option>
              <option value="570">570</option>
              <option value="580">580</option>
              <option value="590">590</option>
              <option value="600">600</option>
              <option value="610">610</option>
              <option value="620">620</option>
              <option value="630">630</option>
              <option value="640">640</option>
              <option value="650">650</option>
              <option value="660">660</option>
              <option value="670">670</option>
              <option value="680">680</option>
              <option value="690">690</option>
              <option value="700">700</option>
              <option value="710">710</option>
              <option value="720">720</option>
              <option value="730">730</option>
              <option value="740">740</option>
              <option value="750">750</option>
              <option value="760">760</option>
              <option value="770">770</option>
              <option value="780">780</option>
              <option value="790">790</option>
              <option value="800">800</option>
              <option value="810">810</option>
              <option value="820">820</option>
              <option value="830">830</option>
              <option value="840">840</option>
              <option value="850">850</option>
              <option value="860">860</option>
              <option value="870">870</option>
              <option value="880">880</option>
              <option value="890">890</option>
              <option value="900">900</option>
              <option value="910">910</option>
              <option value="920">920</option>
              <option value="930">930</option>
              <option value="940">940</option>
              <option value="950">950</option>
              <option value="960">960</option>
              <option value="970">970</option>
              <option value="980">980</option>
              <option value="990">990</option>
              <option value="1000">1000</option>
            </select>

            <select
              onChange={(e) =>
                setDummyUser((prev) => ({
                  ...prev,
                  mode: e.target.value,
                }))
              }
              className="px-2 py-1 border-none rounded appearance-none bg-black/20 ">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <button type="submit" className="px-4 py-2 rounded bg-black/20">
              Go
            </button>
          </form> */}

          <main
            className={classNames(
              "relative  grid  gap-2 p-2 mt-4 sm:gap-4 rounded-xl transition-all",
              {
                "grid-cols-3 grid-rows-3": mode === "easy",
                "grid-cols-4 grid-rows-4": mode === "medium",
                "grid-cols-5 grid-rows-5": mode === "hard",
              }
            )}>
            {Array.from({ length: boxGrids }).map((_, index) => (
              <button
                key={index + 1}
                disabled={isClickable ? false : true}
                onClick={() => handleClickBox(index + 1)}
                className={classNames(
                  "aspect-square bg-white/10 rounded-xl sm:rounded-2xl transition-all shadow-inner  shadow-white/15 duration-100",
                  {
                    "bg-white/40 scale-95": lightedBoxIndex === index + 1,
                    "cursor-default": !isGameStarted,
                    "active:bg-white/40 active:scale-95 cursor-pointer":
                      isGameStarted && isClickable,
                    "bg-green-500/50": isCorrect,
                    "bg-red-500/50": isWrong,
                  }
                )}></button>
            ))}
          </main>
        </DivCentered>
      </DivParent>
    </>
  );
}

export default InGame;
