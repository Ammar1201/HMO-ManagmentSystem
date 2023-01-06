import { createSlice } from "@reduxjs/toolkit";

export const availableDatesSlice = createSlice({
  name: 'availableDates',
  initialState: null,
  reducers: {
    addAvailableDate: (state, action) => {
      if (state.length === 0 || state === null) {
        return [action.payload];
      }
      else {
        return state.push(action.payload);
      }
    },
    updateAvailableDates: (state, action) => {
      return action.payload;
    },
    deleteAvailableDate: (state, action) => {
      return state.filter(date => date._id !== action.payload);
    },
    resetAvailableDates: () => {
      return null;
    }
  }
});

export const { updateAvailableDates, resetAvailableDates, addAvailableDate, deleteAvailableDate } = availableDatesSlice.actions;
export default availableDatesSlice.reducer;