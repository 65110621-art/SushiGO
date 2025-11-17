// src/components/CartContext.jsx
import { createContext, useContext, useMemo, useReducer } from "react";

const CartCtx = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const ex = state.find((x) => x.id === action.item.id);
      if (ex) {
        return state.map((x) =>
          x.id === action.item.id ? { ...x, qty: x.qty + 1 } : x
        );
      }
      return [...state, { ...action.item, qty: 1 }];
    }
    case "REMOVE":
      return state.filter((x) => x.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);

  const api = useMemo(
    () => ({
      items,
      add(item) {
        dispatch({ type: "ADD", item });
      },
      remove(id) {
        dispatch({ type: "REMOVE", id });
      },
      clear() {
        dispatch({ type: "CLEAR" });
      },
    }),
    [items]
  );

  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>;
}

export function useCart() {
  return useContext(CartCtx);
}
