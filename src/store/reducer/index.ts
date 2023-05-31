import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IState } from '../../types'
import axios from 'axios'
interface IProps {
    reg: "Uzb" | "Usa" | "Rus",
    seed: number
    err: number
}
export const getTenUsers = createAsyncThunk("getTenUsers", async ({ reg, seed, err }: IProps) => {
    const res = await axios.post('https://task5-rrh4.onrender.com/', { reg, seed, err })
    return res.data
})
export const getMoreUsers = createAsyncThunk("getMoreUsers", async ({ reg, seed, err }: IProps) => {
    const res = await axios.post('https://task5-rrh4.onrender.com/', { reg, seed, err })
    return res.data
})
const initialState: IState = {
    error: false,
    loader: true,
    users: []
}
const slice = createSlice({
    name: "Slice",
    initialState, reducers: {
    }, extraReducers: (builder) => {
        builder.addCase(getTenUsers.fulfilled, (state, action) => {
            state.users = [...action.payload]
            state.loader = false
        }).addCase(getTenUsers.rejected, (state, action) => {
            state.loader = false
            state.error = action.error.message
        })
        builder.addCase(getMoreUsers.fulfilled, (state, action) => {
            state.users = [...state.users, ...action.payload]
        })
    }
})
const reducer = slice.reducer
export default reducer