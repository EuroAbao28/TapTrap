import React, { createContext, useContext, useEffect, useState } from "react";

// create a context object
const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  // pwede din to
  // const [user, setUser] = useState(() => {
  //   const storedUser = localStorage.getItem("user");
  //   return storedUser ? JSON.parse(storedUser) : null;
  // });
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    // if there is no username in localstorage, create and set one
    if (!user) {
      let randomNumber = [];
      for (let i = 0; i < 8; i++) {
        const generate = Math.floor(Math.random() * 7);
        randomNumber.push(generate);
      }

      const myData = {
        username: `Guest_${randomNumber.join("")}`,
        gender: true,
      };

      localStorage.setItem("user", JSON.stringify(myData));
      setUser(myData);
    }

    if (!theme) {
      localStorage.setItem("theme", "blue");
      setTheme("blue");
    }
  }, []);

  // for updating user data
  const updateUser = (updatedUserData) => {
    // Update state
    setUser(updatedUserData);
    // Update localStorage
    localStorage.setItem("user", JSON.stringify(updatedUserData));
  };

  const updateTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        theme,
        updateTheme,
      }}>
      {children}
    </UserContext.Provider>
  );
};
