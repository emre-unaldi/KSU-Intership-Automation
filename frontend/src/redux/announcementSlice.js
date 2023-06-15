import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
axios.defaults.withCredentials = true

export const createAnnouncement = createAsyncThunk(
    'createAnnouncement',
    async ({ userId, title, type, content }) => {
        const response = await axios.post(
            'http://localhost:3001/api/announcement/create',
            {
                userId,
                title,
                type,
                content
            },
            {
                withCredentials: true 
            }
        )
        return response.data
    }
)

export const getAllAnnouncements = createAsyncThunk(
    'getAllAnnouncements',
    async () => {
        const response = await axios.get(
            'http://localhost:3001/api/announcement/getAll',
            { 
                withCredentials: true 
            }
        )
        return response.data
    }
)

export const updateAnnouncement = createAsyncThunk(
    'updateAnnouncement',
    async ({ _id, title, type, content }) => {
        const response = await axios.post(
            'http://localhost:3001/api/announcement/update',
            {
                _id,
                title,
                type,
                content
            },
            { 
                withCredentials: true
            }
        )
        return response.data
    }
)

export const deleteAnnouncement = createAsyncThunk(
    'deleteAnnouncement',
    async ({ _id }) => {
        const response = await axios.post(
            'http://localhost:3001/api/announcement/delete',
            {
                _id
            },
            { 
                withCredentials: true
            }
        )
        return response.data
    }
)

const initialState = {
    create: { data: '', loading: false, error: '' },
    getAll: { data: '', loading: false, error: '' },
    update: { data: '', loading: false, error: '' },
    delete: { data: '', loading: false, error: '' }
}

export const announcementSlice = createSlice({
    name: 'announcement',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // createAnnouncement
        builder.addCase(createAnnouncement.pending, (state, action) => {
            state.create.loading = true
            state.create.error = ''
        })
        builder.addCase(createAnnouncement.fulfilled, (state, action) => {
            state.create.data = action.payload
            state.create.loading = false
        })
        builder.addCase(createAnnouncement.rejected, (state, action) => {
            state.create.loading = false
            state.create.error = 'Request Fetching Error'
        })

        // getAllAnnouncements
        builder.addCase(getAllAnnouncements.pending, (state, action) => {
            state.getAll.loading = true
            state.getAll.error = ''
        })
        builder.addCase(getAllAnnouncements.fulfilled, (state, action) => {
            state.getAll.data = action.payload
            state.getAll.loading = false
        })
        builder.addCase(getAllAnnouncements.rejected, (state, action) => {
            state.getAll.loading = false
            state.getAll.error = 'Request Fetching Error'
        })

        // updateAnnouncement
        builder.addCase(updateAnnouncement.pending, (state, action) => {
            state.update.loading = true
            state.update.error = ''
        })
        builder.addCase(updateAnnouncement.fulfilled, (state, action) => {
            state.update.data = action.payload
            state.update.loading = false
        })
        builder.addCase(updateAnnouncement.rejected, (state, action) => {
            state.update.loading = false
            state.update.error = 'Request Fetching Error'
        })

        // deleteAnnouncement
        builder.addCase(deleteAnnouncement.pending, (state, action) => {
            state.delete.loading = true
            state.delete.error = ''
        })
        builder.addCase(deleteAnnouncement.fulfilled, (state, action) => {
            state.delete.data = action.payload
            state.delete.loading = false
        })
        builder.addCase(deleteAnnouncement.rejected, (state, action) => {
            state.delete.loading = false
            state.delete.error = 'Request Fetching Error'
        })

    }   
})

export default announcementSlice.reducer