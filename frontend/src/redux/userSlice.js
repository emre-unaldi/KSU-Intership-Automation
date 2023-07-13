import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.withCredentials = true

export const registerStudent = createAsyncThunk(
    'registerStudent',
    async (values) => { // student teacher ayrımını bırak tek user kayıt yap
        const response = await axios.post(
            'http://localhost:3001/api/users/register',
            {
                name: values.studentName,
                surname: values.studentSurname,
                schoolNumber: values.schoolNumber,
                email: values.studentEmail,
                password: values.studentPassword,
                role: values.userType
            },
            {withCredentials: true}
        )
        return response.data
    })

export const registerTeacher = createAsyncThunk(
    'registerTeacher',
    async (values) => {
        const response = await axios.post(
            'http://localhost:3001/api/users/register',
            {
                name: values.teacherName,
                surname: values.teacherSurname,
                phoneNumber: values.teacherPhoneNumber,
                email: values.teacherEmail,
                password: values.teacherPassword,
                role: values.userType
            }
        )
        return response.data
    })

export const updateUser = createAsyncThunk(
    'updateUser',
    async ({_id, name, surname, schoolNumber, phoneNumber, email}) => {
        const response = await axios.post(
            'http://localhost:3001/api/users/update',
            {_id, name, surname, schoolNumber, phoneNumber, email}
        )
        return response.data
    })

export const deleteUser = createAsyncThunk(
    'deleteUser',
    async ({ _id }) => {
        const response = await axios.post(
            'http://localhost:3001/api/users/delete',
            { _id }
        )
        return response.data
    })

export const authorityUser = createAsyncThunk(
    'authorityUser',
    async ({ _id }) => {
        const response = await axios.post(
            'http://localhost:3001/api/users/authority',
            { _id }
        )
        return response.data
    })

export const getAllUsers = createAsyncThunk(
    'getAllUsers',
    async () => {
        const response = await axios.post(
            'http://localhost:3001/api/users/getUsers',
            {
                withCredentials: true
            }
        )
        return response.data
    })

export const getAllUserAndInternships = createAsyncThunk(
    'getAllUserAndInternships',
    async () => {
        const response = await axios.post(
            'http://localhost:3001/api/users/getAll',
            {
                withCredentials: true
            }
        )
        return response.data
    })

export const loginUser = createAsyncThunk(
    'loginUser',
    async (values) => {
        const response = await axios.post(
            'http://localhost:3001/api/users/login',
            {
                email: values.loginEmail,
                password: values.loginPassword
            },
            {withCredentials: true}
        )
        return response.data
    })

export const logoutUser = createAsyncThunk(
    'logoutUser',
    async () => {
        const response = await axios.post(
            'http://localhost:3001/api/users/logout',
            {withCredentials: true}
        )
        return response.data
    })

export const checkUser = createAsyncThunk(
    'checkUser',
    async () => {
        const response = await axios.post(
            'http://localhost:3001/api/users/check',
            {withCredentials: true}
        )
        return response.data
    })

const initialState = {
    check: {data: '', loading: false, error: ''},
    login: {data: '', loading: false, error: ''},
    logout: {data: '', loading: false, error: ''},
    student: {data: '', loading: false, error: ''},
    teacher: {data: '', loading: false, error: ''},
    getAll: {data: '', loading: false, error: ''},
    users: {data: '', loading: false, error: ''},
    update: {data: '', loading: false, error: ''},
    delete: {data: '', loading: false, error: ''},
    authority: {data: '', loading: false, error: ''}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // checkUser
        builder.addCase(checkUser.pending, (state, action) => {
            state.check.loading = true
            state.check.error = ''
        })
        builder.addCase(checkUser.fulfilled, (state, action) => {
            state.check.data = action.payload
            state.check.loading = false
        })
        builder.addCase(checkUser.rejected, (state, action) => {
            state.check.loading = false
            state.check.error = 'Request Fetching Error'
        })

        // loginUser
        builder.addCase(loginUser.pending, (state, action) => {
            state.login.loading = true
            state.login.error = ''
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.login.data = action.payload
            state.login.loading = false
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.login.loading = false
            state.login.error = 'Request Fetching Error'
        })

        // logoutUser
        builder.addCase(logoutUser.pending, (state, action) => {
            state.logout.loading = true
            state.logout.error = ''
        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.logout.data = action.payload
            state.logout.loading = false
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.logout.loading = false
            state.logout.error = 'Request Fetching Error'
        })

        // registerStudent
        builder.addCase(registerStudent.pending, (state, action) => {
            state.student.loading = true
            state.student.error = ''
        })
        builder.addCase(registerStudent.fulfilled, (state, action) => {
            state.student.data = action.payload
            state.student.loading = false
        })
        builder.addCase(registerStudent.rejected, (state, action) => {
            state.student.loading = false
            state.student.error = 'Request Fetching Error'
        })

        // registerTeacher
        builder.addCase(registerTeacher.pending, (state, action) => {
            state.teacher.loading = true
            state.teacher.error = ''
        })
        builder.addCase(registerTeacher.fulfilled, (state, action) => {
            state.teacher.data = action.payload
            state.teacher.loading = false
        })
        builder.addCase(registerTeacher.rejected, (state, action) => {
            state.teacher.loading = false
            state.teacher.error = 'Request Fetching Error'
        })

        // getAllUserAndInternships
        builder.addCase(getAllUserAndInternships.pending, (state, action) => {
            state.getAll.loading = true
            state.getAll.error = ''
        })
        builder.addCase(getAllUserAndInternships.fulfilled, (state, action) => {
            state.getAll.data = action.payload
            state.getAll.loading = false
        })
        builder.addCase(getAllUserAndInternships.rejected, (state, action) => {
            state.getAll.loading = false
            state.getAll.error = 'Request Fetching Error'
        })

        // getAllUsers
        builder.addCase(getAllUsers.pending, (state, action) => {
            state.users.loading = true
            state.users.error = ''
        })
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.users.data = action.payload
            state.users.loading = false
        })
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.users.loading = false
            state.users.error = 'Request Fetching Error'
        })

        // updateUser
        builder.addCase(updateUser.pending, (state, action) => {
            state.update.loading = true
            state.update.error = ''
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.update.data = action.payload
            state.update.loading = false
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.update.loading = false
            state.update.error = 'Request Fetching Error'
        })

        // deleteUser
        builder.addCase(deleteUser.pending, (state, action) => {
            state.delete.loading = true
            state.delete.error = ''
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.delete.data = action.payload
            state.delete.loading = false
        })
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.delete.loading = false
            state.delete.error = 'Request Fetching Error'
        })

        // authorityUser
        builder.addCase(authorityUser.pending, (state, action) => {
            state.authority.loading = true
            state.authority.error = ''
        })
        builder.addCase(authorityUser.fulfilled, (state, action) => {
            state.authority.data = action.payload
            state.authority.loading = false
        })
        builder.addCase(authorityUser.rejected, (state, action) => {
            state.authority.loading = false
            state.authority.error = 'Request Fetching Error'
        })
    },
})

export default userSlice.reducer
