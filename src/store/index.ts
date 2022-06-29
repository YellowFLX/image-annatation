import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {imagesReducer} from "./reducers/images";

export const rootReducer = combineReducers({
  images: imagesReducer,
})

export const store = configureStore({
  devTools: true,
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
