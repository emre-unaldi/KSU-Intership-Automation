import { configureStore } from "@reduxjs/toolkit";
import systemConfigurationSlice from "../redux/systemConfigurationSlice";
import userConfigurationSlice from "../redux/userConfigurationSlice";
import internshipConfigurationSlice from "../redux/internshipConfigurationSlice";

export default configureStore({
  reducer: {
    system: systemConfigurationSlice,
    user: userConfigurationSlice,
    internship: internshipConfigurationSlice
  },
});