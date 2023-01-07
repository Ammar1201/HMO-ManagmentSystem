import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

adminSchema.pre('save', async function (next) {
  const admin = this;

  if (admin.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(admin.password, salt);
    admin.password = passwordHash;
  }

  next();
});

export const Admin = model('admin', adminSchema);