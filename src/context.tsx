import React, { useState, createContext, useContext } from "react";

import { IAppProvider, ICartItem } from "./types";

const AppContext = createContext<IAppProvider>({
  cartItemList: [],
  setCartItemList: () => null,
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItemList, setCartItemList] = useState<Array<ICartItem>>([]);

  return (
    <AppContext.Provider
      value={{
        cartItemList,
        setCartItemList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
