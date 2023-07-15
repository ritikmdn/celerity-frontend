import React from "react";

const TextContext = React.createContext({
  completion: "",
  setCompletion: () => {},
});

export default TextContext;
