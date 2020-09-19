import jwt from "jsonwebtoken";

export class JWT {
 static sign(payload: any) {
  return jwt.sign(payload, "", {
   expiresIn: "7d"
  });
 }

 static decode(token: string) {
  return jwt.verify(token, "");
 }
}
