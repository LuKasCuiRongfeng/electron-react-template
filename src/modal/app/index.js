import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: "app",
  initialState: {
    age: 12,
    fuckNames: []
  },
  reducers: {
    increment(state, action) {
      state.age += action.payload
    }
  }
})

export const { increment } = appSlice.actions

export default appSlice.reducer