

import { createContext, useReducer, useContext } from 'react';
import { shoppingReducer } from '@/reducer/shoppingReducer';
import { shoppingInitialState } from '@/reducer/shoppingInitialState';


const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);

  return (
    <ShoppingCartContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};


export const useShoppingCart = () => useContext(ShoppingCartContext);
