import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorized, Login again",
      });
    }

    // decode will return the concatenated string (email+password)
    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Not Authorized, login again",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
