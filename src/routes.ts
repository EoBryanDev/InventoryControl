import { Router, Request, Response } from "express";
import UserController from "./controllers/user/UserController";
import { checkAuth } from "./middlewares/checkAuth";

const router = Router();
router.get("/test", (req: Request, res: Response) => {
    return res.json({ ok: true });
});

const User = new UserController();
// User Routes
router.post("/user", User.createUser);
router.post("/session", User.authUser);
router.get("/me", checkAuth, User.searchUser);
router.delete("/user/remove", User.removeUser);

export { router };
