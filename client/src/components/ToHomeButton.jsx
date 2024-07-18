import React from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

function ToHomeButton() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className="p-2 text-xl rounded-full cursor-pointer hover:text-white hover:bg-white/10 active:scale-95">
      <FaAngleLeft />
    </div>
  );
}

export default ToHomeButton;
