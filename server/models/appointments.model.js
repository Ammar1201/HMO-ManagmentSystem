import { model, Schema } from "mongoose";

const appointmentsSchema = new Schema({
  doctorID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'doctors'
  },
  patientID: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'patients'
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