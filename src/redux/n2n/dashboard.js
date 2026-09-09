import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    pageTitle: "Dashboard",  // current page title state management
  },
  reducers: {
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload.title
    },
  },
})

export const { setPageTitle } = dashboardSlice.actions

export default dashboardSlice.reducer