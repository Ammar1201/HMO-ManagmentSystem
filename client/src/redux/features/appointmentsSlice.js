import { createSlice } from "@reduxjs/toolkit";

export const availableDatesSlice = createSlice({
  name: 'appointments',
  initialState: null,
  reducers: {
    addAppointment: (state, action) => {
      if (state.length === 0 || state === null) {
        return [action.payload];
      }
      else {
        return state.push(action.payload);
      }
    },
    updateAppointments: (state, action) => {
      return action.payload;
    },
    deleteAppointment: (state, action) => {
      return state.filter(date => date._id !== action.payload);
    },
    resetAppointments: () => {
      return null;
    }
  }
});

export const { updateAppointments, resetAppointments, addAppointment, deleteAppointment } = availableDatesSlice.actions;
export default availableDatesSlice.reducer;