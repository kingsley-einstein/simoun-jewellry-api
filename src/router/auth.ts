import { Router } from "express";
import { Auth } from "../middlewares";
import { UserController } from "../controllers";

const router = Router();

router.post("/register", Auth.emailInUse, UserController.create);
