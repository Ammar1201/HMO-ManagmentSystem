import { createSlice } from "@reduxjs/toolkit";

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState: null,
  reducers: {
    updateDoctor: (state, action) => {
      return {
        email: action.payload.email || state.email || '',
        fullName: action.payload.fullName || state.fullName || '',
        phoneNumber: action.payload.phoneNumber || state.phoneNumber || '',
        specialization: action.payload.specialization || state.specialization || '',
        branch: action.payload.branch || state.branch || '',
      }
    },
    resetDoctor: () => {
      return null;
    }
  }
});

export const { updateDoctor, resetDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;