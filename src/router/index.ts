import { Router } from "express";
import authRouter from "./auth";
import productRouter from "./product";
import cartRouter from "./cart";

const router = Router();

router.get("/", (req, res) => res.status(200).json({
 path: req.path,
 params: req.params,
 query: req.query,
 url: req.hostname,
 message: "Welcome to the Simoun Jewellry API."
}));

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);

export default router;
