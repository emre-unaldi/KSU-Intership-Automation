import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const verifyReCaptcha = createAsyncThunk("verifyReCaptcha", async (token) => {
  const response = await axios.post(process.env.REACT_APP_API_URL, token);
  return response.data
})

const initialState = {
  ksuLink: "https://www.ksu.edu.tr",
  sideBarActive: true,
  browserWindowWidth: window.screen.width,
  recaptcha: {
    data: false,
    loading: false,
    error: 'Error Not Found'
  }
}

export const systemConfigurationSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    sideBarMenuOpen: (state) => {
      if (state.sideBarActive === true) {
        document.querySelector(".sidebar").style.left = "0";
        if (state.browserWindowWidth > 800) {
          document.querySelector("#main").style.marginLeft = "300px";
          document.querySelector("#footer").style.marginLeft = "300px";
        }
        state.sideBarActive = false;
      } else {
        document.querySelector(".sidebar").style.left = "-300px";
        if (state.browserWindowWidth > 800) {
          document.querySelector("#main").style.marginLeft = "0";
          document.querySelector("#footer").style.marginLeft = "0";
        }
        state.sideBarActive = true;
      }
    },
    checkReCaptchaValue: (state) => {
      state.recaptcha.data = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(verifyReCaptcha.pending, (state, action) => {
      state.recaptcha.loading = true;
      state.recaptcha.error = "Error Not Found";
    });
    builder.addCase(verifyReCaptcha.fulfilled, (state, action) => {
      state.recaptcha.data = action.payload;
      state.recaptcha.loading = false;
    });
    builder.addCase(verifyReCaptcha.rejected, (state, action) => {
      state.recaptcha.loading = false;
      state.recaptcha.error = "Request Fetching Error";
    });
  }
});

export const { sideBarMenuOpen, checkReCaptchaValue } = systemConfigurationSlice.actions;
export default systemConfigurationSlice.reducer;
