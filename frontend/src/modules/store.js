import { configureStore } from "@reduxjs/toolkit";
import systemConfigurationSlice from "../redux/systemConfigurationSlice";
import userConfigurationSlice from "../redux/userConfigurationSlice";

export default configureStore({
  reducer: {
    system: systemConfigurationSlice,
    user: userConfigurationSlice
  },
});