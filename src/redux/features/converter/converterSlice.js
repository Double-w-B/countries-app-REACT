import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = `${process.env.REACT_APP_CURRENCY_KEY}`;

const initialState = {
  currencyFrom: "",
  currencyTo: "",
  amount: "",
  results: "",
  converterVis: false,
};

const url = `https://api.getgeoapi.com/v2/currency/convert?api_key=${apiKey}`;

export const getConversion = createAsyncThunk(
  "converter/getConversion",
  async (settings, thunkAPI) => {
    try {
      const [from, to, amount] = settings;
      const endUrl = `${url}&from=${from}&to=${to}&amount=${amount}&format=json`;
      const response = await axios(endUrl);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const converterSlice = createSlice({
  name: "converter",
  initialState,
  reducers: {
    setFrom: (state, action) => {
      state.currencyFrom = action.payload;
    },
    setTo: (state, action) => {
      state.currencyTo = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    clearSettings: (state, action) => {
      state.results = "";
      state.amount = "";
    },
    setConverterVisibility: (state, action) => {
      state.converterVis = action.payload;
    },
    clearResults: (state) => {
      state.results = "";
    },
  },
  extraReducers: {
    [getConversion.pending]: () => {},
    [getConversion.fulfilled]: (state, action) => {
      const localCurr = Object.values(action.payload.rates)[0];
      const { rate_for_amount: result } = localCurr;
      state.results = `${state.amount} ${state.currencyFrom} = ${parseFloat(
        result
      ).toFixed(2)} ${state.currencyTo}`;
    },
    [getConversion.rejected]: () => {},
  },
});

export const {
  setFrom,
  setTo,
  setAmount,
  clearSettings,
  clearResults,
  setConverterVisibility,
} = converterSlice.actions;

export default converterSlice.reducer;
