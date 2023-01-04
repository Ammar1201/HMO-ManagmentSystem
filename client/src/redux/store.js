import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './features/patientSlice';
import doctorReducer from './features/doctorSlice';

export default configureStore({
  reducer: {
    patient: patientReducer,
    doctor: doctorReducer
  }
});