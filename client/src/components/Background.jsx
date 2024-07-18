import React from "react";
import bgShapesLight from "../assets/bgShapesLight.svg";
import bgShapesBlue from "../assets/bgShapesBlue.svg";
import bgShapesRed from "../assets/bgShapesRed.svg";
import bgShapesGreen from "../assets/bgShapesGreen.svg";
import bgShapesCyan from "../assets/bgShapesCyan.svg";
import { useUserContext } from "../contexts/UserContextProvider";

function Background() {
  const { theme } = useUserContext();

  const selectTheme = () => {
    if (theme === "blue") return bgShapesBlue;
    if (theme === "red") return bgShapesRed;
    if (theme === "green") return bgShapesGreen;
    if (theme === "cyan") return bgShapesCyan;
  };

  return (
    <img
      className="absolute object-cover w-full h-full -z-50"
      src={selectTheme()}
      alt="background"
    />
  );
}

export default Background;
