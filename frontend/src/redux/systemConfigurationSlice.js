import { createSlice } from "@reduxjs/toolkit";

export const systemConfigurationSlice = createSlice({
  name: "systemLink",
  initialState: {
    ksuLink: "https://www.ksu.edu.tr",
    sideBarActive: true,
    browserWindowWidth: window.screen.width,
  },
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
  },
});

export const { sideBarMenuOpen } = systemConfigurationSlice.actions;
export default systemConfigurationSlice.reducer;
