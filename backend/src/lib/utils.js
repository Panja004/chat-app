import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  //create token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  //send token to the user
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Milli-Seconds  7d
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
