// BackgroundContext.js
import React, { createContext, useState } from "react";

export const BackgroundContext = createContext();

export const BackgroundProvider = ({ children }) => {
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [appliedCards, setAppliedCards] = useState({});

  const applyBackground = (bgImage) => {
    setSelectedBackground(bgImage);
  };

  return (
    <BackgroundContext.Provider value={{ selectedBackground, applyBackground,appliedCards, setAppliedCards }}>
      {children}
    </BackgroundContext.Provider>
  );
};
