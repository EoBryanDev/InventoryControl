import { Request, response, Response } from "express";
import UserService from "../../services/user/UserService";

import ICreateRequest from "../../models/interfaces/user/ICreateRequest";
import IAuthRequest from "../../models/interfaces/auth/IAuthRequest";

export default class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const { name, email, password }: ICreateRequest = req.body;

            const createUserService = new UserService();
            const user = await createUserService.register({
                name,
                email,
                password,
            });

            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    async authUser(req: Request, res: Response) {
        try {
            const { email, password }: IAuthRequest = req.body;
            const authUserService = new UserService();

            const auth = await authUserService.auth({ email, password });

            return res.status(200).json(auth);
        } catch (error) {
            return res.status(401).json(error);
        }
    }

    async searchUser(req: Request, res: Response) {
        try {
            const user_id = req?.user_id;

            const searchUserService = new UserService();

            const user = await searchUserService.search(user_id);
            res.status(200).json(user);
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    async removeUser(req: Request, res: Response) {
        try {
            const user_id = req?.query.user_id as string;

            const removeUserService = new UserService();

            await removeUserService.remove({ user_id });

            return res.status(204).json("User deleted succesfully!");
        } catch (error) {

            return res.status(400).json(error);
        }
    }
}
