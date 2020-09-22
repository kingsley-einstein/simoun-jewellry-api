import { Router } from "express";
import { Auth } from "../middlewares";
import { UserController } from "../controllers";

const router = Router();

router.post(
 "/register", 
 Auth.keysArePresent(["email", "password"]), 
 Auth.emailInUse, 
 UserController.create
);

router.post("/login", UserController.login);

router.get("/authenticate", Auth.checkToken, UserController.authenticate);

router.get("/logout", Auth.checkToken, UserController.logout);

export default router;
