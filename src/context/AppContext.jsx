/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-case-declarations */
import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AppContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  user: JSON.parse(localStorage.getItem("user")) || null,
  theme: localStorage.getItem("theme") || "light",
  searchQuery: "",
  loading: false,
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

    case "SET_QUERY":
      return { ...state, searchQuery: action.payload };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

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

    case "UPDATE_QUANTITY":
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
    const fetchProducts = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        // Fetch specific skincare category when no search is performed
        const url = state.searchQuery
          ? `https://dummyjson.com/products/search?q=${state.searchQuery}`
          : "https://dummyjson.com/products/";

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchProducts();
  }, [state.searchQuery]);

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

// Custom hook for consuming context
export const useApp = () => useContext(AppContext);

export const AdminGuard = ({ children }) => {
  const { user } = useApp();
  
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};