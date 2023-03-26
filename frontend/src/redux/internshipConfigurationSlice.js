import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const createInternship = createAsyncThunk(
  "createInternship",
  async (internshipValues) => {
    const response = await axios.post(
      "http://localhost:3001/api/internship/create",
      {
        studentID: internshipValues.studentID,
        companyName: internshipValues.companyName,
        companyEmail: internshipValues.companyEmail,
        companyPhone: internshipValues.companyPhone,
        companyResponsibleName: internshipValues.companyResponsibleName,
        companyResponsibleSurname: internshipValues.companyResponsibleSurname,
        companyPersonalCount: internshipValues.companyPersonalCount,
        companyTaxNumber: internshipValues.companyTaxNumber,
        companyAddress: internshipValues.companyAddress,
        internshipDateRange: internshipValues.internshipDateRange,
        instructions: internshipValues.instructions,
        internship: internshipValues.internship
      }
    )
    return response.data;
  }
)

const initialState = {
  internship: { data: "", loading: false, error: "" },
}

export const internshipConfigurationSlice = createSlice({
  name: "internship",
  initialState,
  reducers: {
    instructionsAndInternship: (state, action) => {
      state.getInstructionsAndInternship = action.payload
    }
  },
  extraReducers: (builder) => {

    // createInternship
    builder.addCase(createInternship.pending, (state, action) => {
      state.internship.loading = true;
      state.internship.error = "";
    });
    builder.addCase(createInternship.fulfilled, (state, action) => {
      state.internship.data = action.payload;
      state.internship.loading = false;
    });
    builder.addCase(createInternship.rejected, (state, action) => {
      state.internship.loading = false;
      state.internship.error = "Request Fetching Error";
    });

  }
});

export default internshipConfigurationSlice.reducer;
