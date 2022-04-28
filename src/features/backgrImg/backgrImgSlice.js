import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const clientId = `${process.env.REACT_APP_BACKGROUND_KEY}`;

const url = `https://api.unsplash.com/search/photos/?client_id=${clientId}&page=1&query=`;

const initialState = {
  backgrImgUrl: JSON.parse(localStorage.getItem("backgrImg")) || "",
};

export const getImg = createAsyncThunk(
  "backgrImg/getImg",
  async (name, thunkAPI) => {
    try {
      const resp = await axios(url + name + "%20landscape");
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const backgrImgSlice = createSlice({
  name: "backgrImg",
  initialState,
  reducers: {
    clearUrl: (state, action) => {
      state.backgrImgUrl = "";
    },
  },
  extraReducers: {
    /*     [getImg.pending]: (state) => {
    }, */
    [getImg.fulfilled]: (state, action) => {
      let number = Math.floor(Math.random() * 9);
      state.backgrImgUrl = action.payload.results[number].urls.regular;
      document.querySelector(
        "#root"
      ).style.backgroundImage = `url(${state.backgrImgUrl})`;
      localStorage.setItem("backgrImg", JSON.stringify(state.backgrImgUrl));
    },
    /*     [getImg.rejected]: (state, action) => {
    }, */
  },
});

export const { clearUrl } = backgrImgSlice.actions;

export default backgrImgSlice.reducer;
