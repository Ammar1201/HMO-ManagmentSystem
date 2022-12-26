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
  specialization: {
    type: String,
    required: true
  },
  workCity: {
    type: String,
    required: true
  }
}, { timestamps: true });

doctorsSchema.methods.getPublicProfile = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

// patientsSchema.pre('save', async function (next) {
//   const patient = this;

//   if (user.isModified('password')) {
//     user.password = await bcryptjs.hash(user.password, 8);
//   }

//   next();
// });

export const Doctor = model('doctors', doctorsSchema);