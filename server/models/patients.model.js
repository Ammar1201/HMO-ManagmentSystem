import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const patientsSchema = new Schema({
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
    type: Number,
    required: true
  }
}, { timestamps: true });

patientsSchema.methods.getPublicProfile = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.token;

  return userObject;
};

// patientsSchema.pre('save', async function (next) {
//   const patient = this;

//   if (patient.isModified('password')) {
//     const salt = await bcrypt.genSalt(10);
//     const passwordHash = await bcrypt.hash(patient.password, salt);
//     patient.password = passwordHash;
//   }

//   next();
// });

export const Patient = model('patients', patientsSchema);