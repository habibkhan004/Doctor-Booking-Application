import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, Login again",
      });
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

    // ✅ attach user id to req.user, not req.body
    req.doctor = { id: token_decode.id };

    console.log("Decoded Token:", token_decode);

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authDoctor;
