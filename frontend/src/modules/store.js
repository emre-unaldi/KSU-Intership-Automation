import { configureStore } from '@reduxjs/toolkit'
import systemSlice from '../redux/systemSlice'
import userSlice from '../redux/userSlice'
import internshipSlice from '../redux/internshipSlice'
import documentSlice from '../redux/documentSlice'

export default configureStore({
  reducer: {
    system: systemSlice,
    user: userSlice,
    internship: internshipSlice,
    file: documentSlice
  },
})
