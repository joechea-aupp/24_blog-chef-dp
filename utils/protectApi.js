import { verifyToken } from "../controllers/user.js";

const protectApi = async (req, res, next) => {
  try {
    const authorization = req.header("Authorization");
    if (authorization) {
      const token = authorization.split(" ")[1];
      await verifyToken(token);
      return next();
    }

    res.status(403).json({ message: "Unauthorized access!" });
  } catch (error) {
    res.status(403), json({ message: "Unauthorized access!" });
  }
};

export default protectApi;
