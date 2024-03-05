import React, { createContext } from "react";
export default OwnMathqillInputContext = createContext({
    focusedElementIdForMathQuill: { value:0 },
    setFocusedElementIdForMathQuill: () => {},
  });