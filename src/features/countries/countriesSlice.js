import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://restcountries.com/v3.1/all";

const initialState = {
  countries: JSON.parse(localStorage.getItem("allCountries")) || [],
  isLoading: true,
  showCountries: true,
};

export const getCountries = createAsyncThunk(
  "countries/getCountries",
  async (name, thunkAPI) => {
    try {
      const resp = await axios(url);
      localStorage.setItem("allCountries", JSON.stringify(resp.data));
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("smth went wrong");
    }
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setFoundCountry: (state, action) => {
      state.foundCountry = action.payload;
    },
    showBorderCountries: (state, action) => {
      state.showCountries = action.payload;
    },
  },
  extraReducers: {
    [getCountries.pending]: (state) => {
      state.isLoading = true;
    },
    [getCountries.fulfilled]: (state, action) => {
      state.countries = action.payload;
      state.isLoading = false;
    },
    [getCountries.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { showBorderCountries } = countriesSlice.actions;

export default countriesSlice.reducer;
