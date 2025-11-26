import jwt from "jsonwebtoken";

export function generateToken(payload) {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRY || "7d";
  return jwt.sign(payload, secret, { expiresIn });
}
