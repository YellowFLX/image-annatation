import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {imagesReducer} from "./reducers/images";

export const rootReducer = combineReducers({
  // board: boardReducer,
  images: imagesReducer,
})

export const store = configureStore({
  devTools: true,
  reducer: rootReducer,
  // here we restore the previously persisted state
})

export type RootState = ReturnType<typeof rootReducer>
