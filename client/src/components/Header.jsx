import React from "react";
import ToHomeButton from "./ToHomeButton";

function Header({ children }) {
  return (
    <header className="flex items-center gap-2 border-b border-white/15 pb-4">
      <ToHomeButton />
      {children}
    </header>
  );
}

export default Header;
