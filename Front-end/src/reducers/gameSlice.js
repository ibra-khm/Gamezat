import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {

	games: [],
	reviews: [],
	loading: true,

};

const APIURL = "/games.json";

export const fetchGames = createAsyncThunk("games/fetchGames", async () => {
  try {
    const res = await axios({
      method: "get",
      url: APIURL,
      baseURL: "/",
    });
    console.log(res);
    return res.data;
  } catch (err) {
    return err.message;
  }
});

export const fetchReviews = createAsyncThunk(
	"review/fetchReviews",
	async (guid) => {
		try {
			const res = await axios.get(`/api/reviews/${guid}`);
			console.log(res);
			return res.data;
		} catch (err) {
			return err.message;
		}
	}
);

export const gameSlice = createSlice({

	name: "games",
	initialState,
	reducers: {
		addReview: (state, action) => {
			const data = [...state.reviews.reviews, action.payload];
			return { ...state, reviews: { ...state.reviews, reviews: data } };
		},
		updateReviews: (state, action) => {
			return { ...state, reviews: action.payload };
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchGames.pending, (state, action) => {
			return { ...state, loading: false };
		});
		builder.addCase(fetchGames.fulfilled, (state, action) => {
			return { ...state, games: action.payload };
		});
		builder.addCase(fetchReviews.fulfilled, (state, action) => {
			return { ...state, reviews: action.payload };
		});
	},

});
export const { addReview, updateReviews } = gameSlice.actions;

export default gameSlice.reducer;
