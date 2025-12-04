import { ApiError } from "../utils/ApiError.js";
import Userprofile from "../models/userprofile_model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Passwordbcrpypt } from "../Helper/password_helper.js";
import { Passwordcomparing } from "../Helper/password_helper.js";

const Userregister = asyncHandler(async (req, res) => {
  const { fullName, Email, Password } = req.body;
  if (!fullName || !Email || !Password) {
    throw new ApiError(400, "Details are missing");
  }
  const existingUser = await Userprofile.findOne({ where: { Email } });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }
  const hashedPassword = await Passwordbcrpypt(Password);
  const newUser = await Userprofile.create({
    fullName,
    Email,
    Password: hashedPassword,
  });
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      id: newUser.id,
      fullName: newUser.fullName,
      Email: newUser.Email,
    },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { Email, Password } = req.body;

  try {
    if (!Email || !Password) {
      throw new ApiError(400, "Data is missing");
    }

    const checkuserexist = await Userprofile.findOne({ where: { Email } });

    if (!checkuserexist) {
      throw new ApiError(400, "User not found");
    }

    const isMatch = await Passwordcomparing(Password, checkuserexist.Password);

    if (!isMatch) {
      throw new ApiError(401, "Invalid password");
    }

    const accessToken = checkuserexist.generateAccessToken();
    const refreshToken = checkuserexist.generateRefreshToken();

    checkuserexist.RefreshToken = refreshToken;
    await checkuserexist.save();

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Login successful",
        user: checkuserexist,
        accessToken,
        refreshToken,
      });

  } catch (error) {
    console.log("Error during login:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});




export {Userregister,loginUser};
