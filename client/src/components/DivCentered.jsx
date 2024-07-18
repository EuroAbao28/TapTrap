import React, { useEffect } from "react";
import AOS from "aos";
import { useUserContext } from "../contexts/UserContextProvider";
import classNames from "classnames";

function DivCentered({ children }) {
  const { theme } = useUserContext();

  const selectTheme = () => {
    if (theme === "blue") return "bg-customBlue/40";
    if (theme === "red") return "bg-customRed/40";
    if (theme === "green") return "bg-customGreen/40";
    if (theme === "cyan") return "bg-customCyan/40";
  };

  useEffect(() => {
    AOS.init();
  }, [theme]);

  return (
    <div
      data-aos="fade-down"
      className={classNames(
        "p-4 w-[30rem] shadow relative outline outline-1 outline-white/15   rounded-3xl mx-4",
        selectTheme()
      )}>
      {children}
    </div>
  );
}

export default DivCentered;
