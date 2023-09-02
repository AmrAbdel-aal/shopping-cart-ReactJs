import React, { createContext, useContext, useReducer, useState } from "react";
const appContext = createContext();
import data from "./data";

const initialState = {
  data: data,
  counter: 4,
};
const reducer = (state, action) => {
  if (action.type === "REMOVE") {
    const newData = state.data.filter((item) => {
      console.log(data);
      return item.id != action.payload;
    });
    console.log(newData);
    state.data = newData;
    state.counter = 0;
    state.data.map((item) => {
      state.counter = state.counter + item.amount;
      return item;
    });
    return { ...state, counter: state.counter };
  }
  if (action.type === "INCREASE") {
    const newData = state.data.map((item) => {
      if (item.id == action.payload) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    state.counter = 1;
    state.data.map((item) => {
      state.counter = state.counter + item.amount;
      return item;
    });
    return { ...state, data: newData, counter: state.counter };
  }
  if (action.type === "DECREASE") {
    const newData = state.data.map((item) => {
      if (item.id == action.payload) {
        if (item.amount === 0) {
          return item;
        }
        item.amount = item.amount - 0.5;
        return { ...item, amount: item.amount };
      }
      return item;
    });
    state.data = newData;
    state.counter = 0;
    state.data.map((item) => {
      state.counter = state.counter + item.amount;
      return item;
    });
    return { ...state, counter: state.counter };
  }
  return;
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [totalPrice, setTotalPrice] = useState(0);
  const removeItem = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  const increaseAmount = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };
  const decreaseAmount = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };
  return (
    <appContext.Provider
      value={{
        state,
        removeItem,
        increaseAmount,
        decreaseAmount,
        totalPrice,
        setTotalPrice,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(appContext);
};
export default AppContextProvider;
