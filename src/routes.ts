import { Router, Request, Response } from "express";

import multer from "multer";
import uploadConfig from "./config/multer";

import CategoryController from "./controllers/category/CategoryController";
import ProductController from "./controllers/product/ProductController";
import UserController from "./controllers/user/UserController";

import { checkAuth } from "./middlewares/checkAuth";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));
router.get("/test", (req: Request, res: Response) => {
    return res.json({ ok: true });
});

const User = new UserController();
const Category = new CategoryController();
const Product = new ProductController();
// User Routes
router.post("/user", User.createUser);
router.post("/session", User.authUser);
router.get("/me", checkAuth, User.searchUser);
router.delete("/user/remove", User.removeUser);

// Category Routes
router.post("/category", checkAuth, Category.createCategory);
router.get("/category/listCategory", checkAuth, Category.listCategory);
router.put("/category/edit", checkAuth, Category.editCategory);
router.delete("/category/remove", checkAuth, Category.removeCategory);

// Product Routes
router.post(
    "/product",
    checkAuth,
    upload.single("file"),
    Product.createProduct
);
router.put(
    "/product/edit",
    checkAuth,
    upload.single("file"),
    Product.editProduct
);
router.get("/product", checkAuth, Product.listProductByCategory);
router.get("/products", checkAuth, Product.listAllProducts);
router.delete("/product/remove", checkAuth, Product.removeProduct);


export { router };
