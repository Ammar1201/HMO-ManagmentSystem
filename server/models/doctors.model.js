import { model, Schema } from "mongoose";

const doctorsSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number
  },
  licenseNumber: {
    type: Number,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  workCity: {
    type: String,
    required: true
  }
}, { timestamps: true });

// patientsSchema.pre('save', async function (next) {
//   const patient = this;

//   if (user.isModified('password')) {
//     user.password = await bcryptjs.hash(user.password, 8);
//   }

//   next();
// });

export const Patient = model('patients', doctorsSchema);