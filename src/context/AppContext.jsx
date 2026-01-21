/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-case-declarations */
import { createContext, useContext, useReducer, useEffect, useState } from "react";

const AppContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  user: JSON.parse(localStorage.getItem("user")) || null,
  theme: localStorage.getItem("theme") || "light",
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return { ...state, theme: newTheme };

    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };

    case "LOGOUT":
      localStorage.removeItem("user");
      return { ...state, user: null };

    case "ADD_TO_CART":
      const exists = state.cart.find((item) => item.id === action.payload.id);
      const updatedCartAdd = exists
        ? state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          )
        : [...state.cart, { ...action.payload, quantity: action.payload.quantity || 1 }];
      
      localStorage.setItem("cart", JSON.stringify(updatedCartAdd));
      return { ...state, cart: updatedCartAdd };

    case "UPDATE_QUANTITY": // NEW CASE ADDED HERE
      const updatedQtyCart = state.cart.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.qty } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedQtyCart));
      return { ...state, cart: updatedQtyCart };

    case "REMOVE_ITEM":
      const filtered = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(filtered));
      return { ...state, cart: filtered };

    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <AppContext.Provider value={{ ...state, dispatch, products }}>
      <div className={`${state.theme} contents`}>
        <div className="min-h-screen bg-brand-nude text-brand-berry dark:bg-luxury-black dark:text-brand-nude transition-colors duration-500 ease-in-out">
          {children}
        </div>
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);