import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.withCredentials = true

export const createInternship = createAsyncThunk(
    'createInternship',
    async (values) => {
        const response = await axios.post(
            'http://localhost:3001/api/internship/create',
            {
                studentID: values.studentID,
                companyName: values.companyName,
                companyEmail: values.companyEmail,
                companyPhone: values.companyPhone,
                companyResponsibleName: values.companyResponsibleName,
                companyResponsibleSurname: values.companyResponsibleSurname,
                companyPersonalCount: values.companyPersonalCount,
                companyTaxNumber: values.companyTaxNumber,
                companyAddress: values.companyAddress,
                internshipDateRange: values.internshipDateRange,
                instructions: values.instructions,
                internship: values.internship
            }
        )
        return response.data
    })

export const updateInternship = createAsyncThunk(
    'updateInternship',
    async ({
               _id,
               companyName,
               companyEmail,
               companyPhone,
               companyResponsibleName,
               companyResponsibleSurname,
               companyPersonalCount,
               companyTaxNumber,
               companyAddress,
               internshipDateRange,
               internship
           }) => {
        const response = await axios.post(
            'http://localhost:3001/api/internship/update',
            {
                _id,
                companyName,
                companyEmail,
                companyPhone,
                companyResponsibleName,
                companyResponsibleSurname,
                companyPersonalCount,
                companyTaxNumber,
                companyAddress,
                internshipDateRange,
                internship
            }
        )
        return response.data
    })

export const deleteInternship = createAsyncThunk(
    'deleteInternship',
    async ({_id}) => {
        const response = await axios.post(
            'http://localhost:3001/api/internship/delete',
            {_id}
        )
        return response.data
    })

export const getAllInternships = createAsyncThunk(
    'getAllInternships',
    async () => {
        const response = await axios.post(
            'http://localhost:3001/api/internship/getAll'
        )
        return response.data
    })

export const sendInternshipConfirmationMail = createAsyncThunk(
    'sendInternshipConfirmationMail',
    async (values) => {
        const response = await axios.post(
            'http://localhost:3001/api/internship/sendMail',
            {
                studentID: values.studentID,
                internship: values.internship
            }
        )
        return response.data
    })

export const companyApprovalStatus = createAsyncThunk(
    'companyApprovalStatus',
    async (values) => {
        const response = await axios.post(
            `http://localhost:3001/api/internship/companyApproval?Id=${values.studentID}&is=${values.internship}`,
            {
                Status: values.Status
            }
        )
        return response.data
    })

export const consultantApprovalStatus = createAsyncThunk(
    'consultantApprovalStatus',
    async (values) => {
        const response = await axios.post(
            `http://localhost:3001/api/internship/consultantApproval`,
            {
                selectedInternshipId: values.selectedInternshipId,
                Status: values.Status
            }
        )
        return response.data
    })

const initialState = {
    create: {data: '', loading: false, error: ''},
    sendMail: {data: '', loading: false, error: ''},
    companyApproval: {data: '', loading: false, error: ''},
    consultantApproval: {data: '', loading: false, error: ''},
    getAll: {data: '', loading: false, error: ''},
    delete: {data: '', loading: false, error: ''},
    update: {data: '', loading: false, error: ''}
}

export const internshipSlice = createSlice({
    name: 'internship',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // createInternship
        builder.addCase(createInternship.pending, (state, action) => {
            state.create.loading = true
            state.create.error = ''
        })
        builder.addCase(createInternship.fulfilled, (state, action) => {
            state.create.data = action.payload
            state.create.loading = false
        })
        builder.addCase(createInternship.rejected, (state, action) => {
            state.create.loading = false
            state.create.error = 'Request Fetching Error'
        })

        // companyApprovalStatus
        builder.addCase(companyApprovalStatus.pending, (state, action) => {
            state.companyApproval.loading = true
            state.companyApproval.error = ''
        })
        builder.addCase(companyApprovalStatus.fulfilled, (state, action) => {
            state.companyApproval.data = action.payload
            state.companyApproval.loading = false
        })
        builder.addCase(companyApprovalStatus.rejected, (state, action) => {
            state.companyApproval.loading = false
            state.companyApproval.error = 'Request Fetching Error'
        })

        // consultantApprovalStatus
        builder.addCase(consultantApprovalStatus.pending, (state, action) => {
            state.consultantApproval.loading = true
            state.consultantApproval.error = ''
        })
        builder.addCase(consultantApprovalStatus.fulfilled, (state, action) => {
            state.consultantApproval.data = action.payload
            state.consultantApproval.loading = false
        })
        builder.addCase(consultantApprovalStatus.rejected, (state, action) => {
            state.consultantApproval.loading = false
            state.consultantApproval.error = 'Request Fetching Error'
        })

        // getAllInternships
        builder.addCase(getAllInternships.pending, (state, action) => {
            state.getAll.loading = true
            state.getAll.error = ''
        })
        builder.addCase(getAllInternships.fulfilled, (state, action) => {
            state.getAll.data = action.payload
            state.getAll.loading = false
        })
        builder.addCase(getAllInternships.rejected, (state, action) => {
            state.getAll.loading = false
            state.getAll.error = 'Request Fetching Error'
        })

        // sendInternshipConfirmationMail
        builder.addCase(sendInternshipConfirmationMail.pending, (state, action) => {
            state.sendMail.loading = true
            state.sendMail.error = ''
        })
        builder.addCase(sendInternshipConfirmationMail.fulfilled, (state, action) => {
                state.sendMail.data = action.payload
                state.sendMail.loading = false
        })
        builder.addCase(sendInternshipConfirmationMail.rejected, (state, action) => {
                state.sendMail.loading = false
                state.sendMail.error = 'Request Fetching Error'
        })

        // deleteInternship
        builder.addCase(deleteInternship.pending, (state, action) => {
            state.delete.loading = true
            state.delete.error = ''
        })
        builder.addCase(deleteInternship.fulfilled, (state, action) => {
                state.delete.data = action.payload
                state.delete.loading = false
        })
        builder.addCase(deleteInternship.rejected, (state, action) => {
                state.delete.loading = false
                state.delete.error = 'Request Fetching Error'
        })

        // updateInternship
        builder.addCase(updateInternship.pending, (state, action) => {
                state.update.loading = true
                state.update.error = ''
        })
        builder.addCase(updateInternship.fulfilled, (state, action) => {
                state.update.data = action.payload
                state.update.loading = false
        })
        builder.addCase(updateInternship.rejected, (state, action) => {
                state.update.loading = false
                state.update.error = 'Request Fetching Error'
        })
    }
})

export default internshipSlice.reducer
