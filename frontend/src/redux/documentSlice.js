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

export const fileFetchByUserId = createAsyncThunk('fileFetchByUserId', async (file) => {
    const response = await axios.post(
        'http://localhost:3001/api/file/fetch',
        {
            studentID : file.studentID
        }
    )
    return response.data
})

export const fileDeleteByUser = createAsyncThunk('fileDeleteByUser', async (file) => {
    const response = await axios.post(
        'http://localhost:3001/api/file/delete',
        {
            fileName : file.name,
            documentType : file.documentType,
            internshipType: file.internshipType
        }
    )
    return response.data
})

const initialState = {
    upload: { data: '', loading: false, error: '' },
    fetch: { data: '', loading: false, error: '' },
    delete: { data: '', loading: false, error: '' }
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

        // fileFetchByUserId
        builder.addCase(fileFetchByUserId.pending, (state, action) => {
            state.fetch.loading = true
            state.fetch.error = ''
        })
        builder.addCase(fileFetchByUserId.fulfilled, (state, action) => {
            state.fetch.data = action.payload
            state.fetch.loading = false
        })
        builder.addCase(fileFetchByUserId.rejected, (state, action) => {
            state.fetch.loading = false
            state.fetch.error = 'Request Fetching Error'
        })

        // fileDeleteByUser
        builder.addCase(fileDeleteByUser.pending, (state, action) => {
            state.delete.loading = true
            state.delete.error = ''
        })
        builder.addCase(fileDeleteByUser.fulfilled, (state, action) => {
            state.delete.data = action.payload
            state.delete.loading = false
        })
        builder.addCase(fileDeleteByUser.rejected, (state, action) => {
            state.delete.loading = false
            state.delete.error = 'Request Fetching Error'
        })
    }
})

export default documentSlice.reducer
