import Userprofile from "../models/userprofile_model.js";

export const logoutUser = async (req, res) => {
  try {
    const userId = req.user.id; // from middleware

    await Userprofile.update(
      { refreshToken: null },
      { where: { id: userId } }
    );

    res.clearCookie("refreshToken");

    return res.status(200).json({
      message: "Logout successful",
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
