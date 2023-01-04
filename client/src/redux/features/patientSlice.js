import { createSlice } from "@reduxjs/toolkit";

export const patientSlice = createSlice({
  name: 'patient',
  initialState: null,
  reducers: {
    updatePatient: (state, action) => {
      return {
        email: action.payload.email || state.email || '',
        fullName: action.payload.fullName || state.fullName || '',
        phoneNumber: action.payload.phoneNumber || state.phoneNumber || '',
        appointments: action.payload.appointments || state?.appointments || []
      }
    },
    resetPatient: () => {
      return null;
    }
  }
});

export const { updatePatient, resetPatient } = patientSlice.actions;
export default patientSlice.reducer;