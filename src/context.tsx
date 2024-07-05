import React, { useState, createContext, useContext } from "react";

import { IAppProvider, ICartItem, IStockDetails } from "./types";

const AppContext = createContext<IAppProvider>({
  cartItemList: [],
  setCartItemList: () => null,
  stockDetails: [],
  setStockDetails: () => null,
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItemList, setCartItemList] = useState<Array<ICartItem>>([]);
  const [stockDetails, setStockDetails] = useState<Array<IStockDetails>>([]);

  return (
    <AppContext.Provider
      value={{
        cartItemList,
        setCartItemList,
        stockDetails,
        setStockDetails,
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
