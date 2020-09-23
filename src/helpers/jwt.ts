import jwt from "jsonwebtoken";
import env from "../env";

export class JWT {
 static sign(payload: any) {
  return jwt.sign(payload, env.jwt_secret, {
   expiresIn: "7d"
  });
 }

 static decode(token: string) {
  return jwt.verify(token, env.jwt_secret);
 }
}
