import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
import IAuthRequest from "../../models/interfaces/auth/IAuthRequest";
import ICreateRequest from "../../models/interfaces/user/ICreateRequest";
import IRemoveRequest from "../../models/interfaces/user/IRemoveRequest";

class UserService {
    async auth({ email, password }: IAuthRequest) {
        if (!email) {
            throw new Error("You must pass your email!");
        }
        if (!password) {
            throw new Error("You must pass your password!");
        }

        // Verify if there is any user with this email
        const user = await prismaClient.user.findFirst({
            where: {
                email: email,
            },
        });

        if (!user) {
            throw new Error("Invalid username or password!");
        }

        // Verify if password is valid
        const passwordValid = await compare(password, user?.password);

        if (!passwordValid) {
            throw new Error("Invalid password!");
        }

        const token = sign(
            {
                name: user?.name,
                email: user?.email,
            },
            process.env.JWT_SECRET as string,
            {
                subject: user?.id,
                expiresIn: "30d",
            }
        );

        return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            token: token,
        };
    }

    async register({ name, email, password }: ICreateRequest) {
        if (!email) {
            throw new Error("Email incorrect");
        }

        const userAlreadyExist = await prismaClient.user.findFirst({
            where: {
                email: email,
            },
        });
        if (userAlreadyExist) {
            throw new Error("Email already exists");
        }

        // Encrypting user password
        const passwordHash = await hash(password, 8);

        // Creating user
        const user = prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        return user;
    }

    async search(user_id: string) {
        if (user_id) {
            const user = await prismaClient.user.findFirst({
                where: {
                    id: user_id,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });
            return user;
        }
    }

    async remove({ user_id }: IRemoveRequest) {
        const userExist = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        })

        if (!userExist) {
            throw new Error("There was not found any user with this id!");
        }

        const removeUser = await prismaClient.user.delete({
            where: {
                id: user_id,
            },
        });
        return removeUser;
    }
}

export default UserService;
