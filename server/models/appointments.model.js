import { model, Schema } from "mongoose";

const appointmentsSchema = new Schema({
  doctorID: {
    type: String,
    required: true
  },
  patientID: {
    type: String,
    default: null
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  isOver: {
    type: Boolean,
    default: false
  },
  isAssigned: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export const Appointment = model('appointments', appointmentsSchema);