import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    fullName: '',
    phoneNumber: '',
    appointment: []
  },
  reducers: {
    updateUser: (state, payload) => {
      return {
        email: payload.user.email || state.email,
        fullName: payload.user.fullName || state.fullName,
        phoneNumber: payload.user.phoneNumber || state.phoneNumber,
        appointment: payload.user.appointment || state.appointment
      }
    }
  }
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;