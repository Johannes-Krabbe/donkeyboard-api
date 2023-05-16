import jwt, { JwtPayload } from "jsonwebtoken";

const secretKey = process.env.SECRET ? process.env.SECRET : "SECRET";

export function verifyJWT(token: string): string {
  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    return decoded.userId;
  } catch (err) {
    throw new Error("Invalid token");
  }
}

export function createJWT(userId: string): string {
  const payload = { userId };
  const options = { expiresIn: "20d" };
  const token = jwt.sign(payload, secretKey, options);
  return token;
}
