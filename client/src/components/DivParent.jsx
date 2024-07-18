import React, { useEffect } from "react";

function DivParent({ children }) {
  return (
    <div className="flex items-center justify-center w-screen h-svh">
      {children}
    </div>
  );
}

export default DivParent;
