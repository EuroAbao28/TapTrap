import React from "react";
import { useNavigate } from "react-router-dom";

function ButtonMode({ mode }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${mode}`);
  };

  return (
    <button
      onClick={handleClick}
      className="sm:w-2/3 w-full bg-white/5 hover:text-white p-2 rounded-2xl text-lg font-semibold hover:bg-white/10 transition-all capitalize active:scale-95">
      {mode}
    </button>
  );
}

export default ButtonMode;
