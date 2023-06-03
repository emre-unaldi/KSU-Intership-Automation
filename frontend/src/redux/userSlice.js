import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
axios.defaults.withCredentials = true

export const checkUser = createAsyncThunk('checkUser', async () => {
  const response = await axios.post(
    'http://localhost:3001/api/users/check', 
    { withCredentials: true }
  )
  return response.data
})

export const logoutUser = createAsyncThunk('logoutUser', async () => {
  const response = await axios.post(
    'http://localhost:3001/api/users/logout', 
    { withCredentials: true }
  )
  return response.data
})

export const loginUser = createAsyncThunk('loginUser', async (values) => {
  const response = await axios.post(
    'http://localhost:3001/api/users/login',
    {
      email: values.loginEmail,
      password: values.loginPassword
    },
    { withCredentials: true }
  )
  return response.data
})

export const registerStudent = createAsyncThunk(
  'registerStudent',
  async (values) => {
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
      { withCredentials: true }
    )
    return response.data
  }
)

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
  }
)

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
  }
)

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
  }
)

const initialState = {
  check: { data: '', loading: false, error: '' },
  login: { data: '', loading: false, error: '' },
  logout: { data: '', loading: false, error: '' },
  student: { data: '', loading: false, error: '' },
  teacher: { data: '', loading: false, error: '' },
  getAll: { data: '', loading: false, error: '' },
  users: { data: '', loading: false, error: '' }
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
  },
})

export default userSlice.reducer
