import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: String, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const phoneNumberSchema = mongoose.Schema(
  {
    number: { type: String, required: true },
    primary: { type: String, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const specializationSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    primary: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);
const userSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    idnumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isLawyer: { type: Boolean, required: true, default: false },
    city: { type: String, required: true },
    phoneNumbers: [phoneNumberSchema],
    reviews: [reviewSchema],
    numReviews: { type: Number, required: true, default: 0 },
    idImage: { type: String, required: false, default: '' },
    image: { type: String, required: false, default: '' },
    ciityN: { type: String, required: false, default: '' },
    specializations: [specializationSchema],
  },
  {
    timestamps: true,
  }
);
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model('User', userSchema);
export default User;
