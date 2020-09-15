import bcrypt from "bcryptjs";

export class BCrypt {
 static hashPw(pw: string): string {
  return bcrypt.hashSync(pw, bcrypt.genSaltSync(14));
 }

 static comparePw(pw: string, hash: string): boolean {
  return bcrypt.compareSync(pw, hash);
 }
}
