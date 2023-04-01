import prismaClient from "../../prisma";
import ICategoryRequest from "../../models/interfaces/category/ICategoryRequest";
import IEditCategoryRequest from "../../models/interfaces/category/IEditCategoryRequest";
import { IRemoveCategoryRequest } from "../../models/interfaces/category/IRemoveCategoryRequest";

class CategoryService {
    async create({ name }: ICategoryRequest) {
        if (name === "" || name === null || !name) {
            throw new Error("Invalid name");
        }

        // const categoryAlreadyExists = prismaClient.category.findFirst({
        //     where: {
        //         name: name,
        //     },
        // });



        // if (categoryAlreadyExists) {
        //     throw new Error("That category was already added!");
        // }

        const category = prismaClient.category.create({
            data: {
                name: name,
            },
            select: {
                id: true,
                name: true,
            },
        });
        return category;
    }

    async edit({ name, category_id }: IEditCategoryRequest) {
        if (category_id === "" || name === "" || !category_id || !name) {
            throw new Error("Invalid arguments to edit category");
        }

        const productEdited = await prismaClient.category.update({
            where: {
                id: category_id,
            },
            data: {
                name: name,
            },
        });
        return productEdited;
    }
    async list() {
        const showCategories = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true,
            }
        })

        return showCategories;
    }

    async remove({category_id}: IRemoveCategoryRequest) {
        const category = await prismaClient.category.delete({
            where: {
                id: category_id
            },
        })

        return category
    }
}

export default CategoryService;
