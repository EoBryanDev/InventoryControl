import { Request, response, Response } from "express";
import UserService from "../../services/user/UserService";

import IUserRequest from "../../models/interfaces/user/IUserRequest";
import IAuthRequest from "../../models/interfaces/auth/IAuthRequest";

class UserController {
  async createUser(req: Request, res: Response) {
    const { name, email, password }: IUserRequest = req.body;

    const createUserService = new UserService();
    const user = await createUserService.register({
      name,
      email,
      password,
    });

    return res.json(user);
  }

  async authUser(req: Request, res: Response) {
    const { email, password }: IAuthRequest = req.body;
    const authUserService = new UserService();

    const auth = await authUserService.auth({ email, password });

    return res.json(auth);
  }

}

export default UserController;
