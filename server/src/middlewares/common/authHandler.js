const asyncHandler = require("../../utils/asyncHandler");
const ApiErrorHandler = require("../../utils/apiErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");

const authHandler = asyncHandler(async (req, res, next) => {
  try {
    // const token =
    //   req.cookies?.accesstoken || req.headers.authorization?.split(" ")[1];
    // console.log(req);

    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Basic ", "");

    // const token =req.cookies?.accesstoken || req.headers.authorization?.split(" ")[1];

    // const cookies = req.headers.cookie;
    // const token = cookies.split("=")[1];

    console.log(token);

    if (!token) {
      throw new ApiErrorHandler(401, "Unauthorized request");
    }

    //verifying token using jwt
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    //finding the user
    const user = await User.findById(decodedToken?.id).select(
      "-password -refreshToken"
    );

    //checking if the user exists
    if (!user) {
      throw new ApiErrorHandler(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiErrorHandler(401, error?.message || "Invalid access token");
  }
});

module.exports = authHandler;
