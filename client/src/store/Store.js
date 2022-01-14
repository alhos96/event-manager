import { configureStore } from "@reduxjs/toolkit";
import api from "./middleware/api";
import combinedReducers from "./combinedReducers";

const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
});

export default store;
