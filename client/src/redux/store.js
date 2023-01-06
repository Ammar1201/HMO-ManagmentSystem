import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './features/patientSlice';
import doctorReducer from './features/doctorSlice';
import availableDatesReducer from './features/availableDatesSlice';
import appointmentsReducer from './features/appointmentsSlice';

export default configureStore({
  reducer: {
    patient: patientReducer,
    doctor: doctorReducer,
    availableDates: availableDatesReducer,
    appointments: appointmentsReducer
  }
});