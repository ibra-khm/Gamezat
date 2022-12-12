import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./reducers/gameSlice";

export const store = configureStore({
	reducer: {
		games: gameReducer,
	},
});
