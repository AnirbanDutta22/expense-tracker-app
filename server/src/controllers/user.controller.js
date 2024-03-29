const asyncHandler = require("../utils/asyncHandler");
const ApiErrorHandler = require("../utils/apiErrorHandler");
const ApiResponseHandler = require("../utils/apiResponseHandler");
const User = require("../models/user.model");

//access token refresh token generating utility method
const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiErrorHandler(
      500,
      "Access token, Refresh token generating failed !"
    );
  }
};

//register user
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  //checking if any field is unfilled
  if (!name || !email || !password) {
    throw new ApiErrorHandler(400, "All fields are required !");
  }

  //checking if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiErrorHandler(409, "User already exists");
  }

  //creating new user
  const user = await User.create({
    name,
    email,
    password,
  });

  //checking if user is created successfully
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiErrorHandler(500, "Something went wrong!");
  }
  return res
    .status(200)
    .json(
      new ApiResponseHandler(201, "User registered successfully", createdUser)
    );
});

//login user
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if any field is unfilled
  if (!email || !password) {
    throw new ApiErrorHandler(400, "All fields are required !");
  }

  //checking if the user exists or not
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiErrorHandler(409, "User not exists ! Please register !");
  }

  //checking if given password is valid
  const isPasswordValid = await user.isValidPassword(password);
  if (!isPasswordValid) {
    throw new ApiErrorHandler(409, "Invalid user login credentials");
  }

  //generate tokens
  const { accessToken, refreshToken } = await generateTokens(user._id);

  //fetching logged in user
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //configuring cookie options
  const options = {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponseHandler(201, "User logged in successfully", loggedInUser)
    );
});

//logout user
const logoutUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponseHandler(200, "User logged Out", {}));
});

module.exports = { registerUser, loginUser, logoutUser };
