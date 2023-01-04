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
    type: String,
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

doctorsSchema.methods.getPublicProfile = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

doctorsSchema.pre('save', async function (next) {
  const doctor = this;

  if (doctor.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    doctor.password = passwordHash;
  }

  next();
});

export const Doctor = model('doctors', doctorsSchema);