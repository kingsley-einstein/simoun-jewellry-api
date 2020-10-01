import { Router } from "express";
import { Auth, Upload } from "../middlewares";
import { ProductController } from "../controllers";

const router = Router();

router.post(
 "/upload",
 Auth.checkToken,
 Upload.m.single("picture"),
 Upload.upload,
 ProductController.create
);

router.get("/:id", ProductController.findById);

router.get("/byUser", Auth.checkToken, ProductController.findByUploader);

router.patch(
 "/update/:id",
 Auth.checkToken,
 Upload.m.single("picture"),
 Upload.upload,
 ProductController.updateProduct
);

router.patch("/add_to_cart/:productId/:cartId", Auth.checkToken, ProductController.addToCart);

router.delete("/:id", Auth.checkToken, ProductController.deleteSingleProduct);

router.delete("/byUser", Auth.checkToken, ProductController.deleteByUploader);

export default router;
