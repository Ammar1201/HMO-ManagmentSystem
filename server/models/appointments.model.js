import { model, Schema } from "mongoose";

const appointmentsSchema = new Schema({
  patientID: {
    type: String,
    required: true
  },
  doctorID: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: Date,
    default: Date.now()
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export const Appointment = model('appointments', appointmentsSchema);