import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc   Auth user & get token
// @route  POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      idnumber: user.idnumber,
      city: user.city,
      phoneNumbers: user.phoneNumbers,
      isLawyer: user.isLawyer,
      email: user.email,
      isAdmin: user.isAdmin,
      idImage: user.idImage,
      ciityN: user.ciityN,
      specialization: user.specialization,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});
// @desc   Get User Profile
// @route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  // console.log(req.user)
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      firstname: user.firstName,
      lastName: user.lastName,
      idNumber: user.idNumber,
      city: user.city,
      phone: user.phone,
      isLawyer: user.isLawyer,
      email: user.email,
      isAdmin: user.isAdmin,
      idImage: user.idImage,
      image: user.image,
      ciityN: user.ciityN,
      specialization: user.specialization,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc   Register a new user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    idnumber,
    city,
    phone,
    isLawyer,
    idImage,
    ciityN,
    specialization,
  } = req.body;
  console.log(req.body);
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({
    firstname,
    lastname,
    email,
    password,
    idnumber,
    city,
    phoneNumbers: [{ number: phone, primary: true }],
    isLawyer,
    idImage,
    ciityN,
    specialization,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      idnumber: user.idnumber,
      city: user.city,
      phoneNumbers: user.phoneNumbers,
      isLawyer: user.isLawyer,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      idImage: user.idImage,
      image: user.image,
      ciityN: user.ciityN,
      specialization: user.specialization,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.idnumber = req.body.idnumber;
    user.city = req.body.city;
    user.phone = req.body.phone;
    user.ciityN = req.body.ciityN;
    user.specialization = req.body.specialization;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      idnumber: updatedUser.idnumber,
      city: updatedUser.city,
      phone: updatedUser.phone,
      isLawyer: updatedUser.isLawyer,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(user._id),
      idImage: updatedUser.idImage,
      image: updatedUser.image,
      ciityN: updatedUser.ciityN,
      specialization: updatedUser.specialization,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
// @desc   Get all users
// @route  POST /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc Create new review
// @route POST /api/users/lawyers/:id/reviews
// @access Private
const createLawyerReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const user = await User.findById(req.params.id);
  if (user) {
    const alreadyReviewed = user.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('User already reviewed');
    }
    const review = {
      name: req.user.firstname + ' ' + req.user.lastname,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    user.reviews.push(review);
    user.numReviews = user.reviews.length;
    user.rating =
      user.reviews.reduce((acc, item) => item.rating + acc, 0) /
      user.reviews.length;
    await user.save();
    res.status(201).json({ message: 'Review Added' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Get top rated lawyers
// @route GET /api/lawyers/top
// @access Private
const getTopLawyers = asyncHandler(async (req, res) => {
  // descending order
  const lawyers = await User.find({ isLawyer: true, isAdmin: false })
    .sort()
    .limit(3);
  res.json(lawyers);
});

// @desc   Get all lawyers
// @route  GET /api/lawyers
// @access Private/Admin
const getLawyerList = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        isAdmin: false,
        isLawyer: true,
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : { isAdmin: false, isLawyer: true };
  const count = await User.countDocuments({ ...keyword });
  const users = await User.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ users, page, pages: Math.ceil(count / pageSize) });
});

// @desc   Delete user
// @route  DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User Removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc   Get User By ID
// @route  GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

// @desc   Update user
// @route  PUT /api/users/:id
// @access Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getLawyerList,
  getTopLawyers,
  createLawyerReview,
};
