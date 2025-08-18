import { configureStore } from "@reduxjs/toolkit";
import flowReducer from "./reducers/flowSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      flow: flowReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
