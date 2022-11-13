import { configureStore } from "@reduxjs/toolkit";
import systemConfigurationSlice from "../redux/systemConfigurationSlice";

export default configureStore({
  reducer: {
    system: systemConfigurationSlice,
  },
});
