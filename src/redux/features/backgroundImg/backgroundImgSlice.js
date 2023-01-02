import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const clientId = `${process.env.REACT_APP_BACKGROUND_KEY}`;

const url = `https://api.unsplash.com/search/photos/?client_id=${clientId}&page=1&query=`;

const initialState = {
  backgroundImgUrl: JSON.parse(sessionStorage.getItem("backgroundImg")) || "",
  isBackgroundImgLoading: false,
};

export const getImg = createAsyncThunk(
  "backgroundImg/getImg",
  async (name, thunkAPI) => {
    const endUrl = url + name + "%20landscape";
    try {
      const response = await axios(endUrl);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const backgroundImgSlice = createSlice({
  name: "backgroundImg",
  initialState,
  reducers: {
    clearUrl: (state, action) => {
      state.backgroundImgUrl = "";
    },
  },
  extraReducers: {
    [getImg.pending]: (state) => {
      state.isBackgroundImgLoading = true;
    },
    [getImg.fulfilled]: (state, action) => {
      const number = Math.floor(Math.random() * 9);
      const result = action.payload.results[number].urls.regular;

      state.backgroundImgUrl = result;
      sessionStorage.setItem("backgroundImg", JSON.stringify(result));
      state.isBackgroundImgLoading = false;
    },
    [getImg.rejected]: (state, action) => {
      state.isBackgroundImgLoading = false;
    },
  },
});

export const { clearUrl } = backgroundImgSlice.actions;

export default backgroundImgSlice.reducer;
