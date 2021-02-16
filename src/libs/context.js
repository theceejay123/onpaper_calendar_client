import { useContext, createContext } from "react";

const AppContext = createContext(null);

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, useAppContext };
