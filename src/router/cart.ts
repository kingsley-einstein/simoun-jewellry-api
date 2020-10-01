import { Router } from "express";
import { Auth } from "../middlewares";
import { CartController } from "../controllers";

const router = Router();

router.post("/create", Auth.checkToken, CartController.create);
router.get("/:id", Auth.checkToken, CartController.findById);
router.get("/byOwner", Auth.checkToken, CartController.findByOwner);
router.delete("/:id", Auth.checkToken, CartController.deleteById);
router.delete("/all", Auth.checkToken, CartController.deleteAll);

export default router;
