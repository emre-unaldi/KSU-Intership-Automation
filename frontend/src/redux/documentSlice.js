import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
axios.defaults.withCredentials = true

export const fileUploadByUserId = createAsyncThunk('fileUploadByUserId', async (file) => {
    const response = await axios.post(
        'http://localhost:3001/api/file/upload',
        file,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )
    return response.data
})

const initialState = {
    upload: { data: '', loading: false, error: '' }
}

export const documentSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fileUploadByUserId
        builder.addCase(fileUploadByUserId.pending, (state, action) => {
        state.upload.loading = true
        state.upload.error = ''
        })
        builder.addCase(fileUploadByUserId.fulfilled, (state, action) => {
        state.upload.data = action.payload
        state.upload.loading = false
        })
        builder.addCase(fileUploadByUserId.rejected, (state, action) => {
        state.upload.loading = false
        state.upload.error = 'Request Fetching Error'
        })
    }
})

export default documentSlice.reducer
