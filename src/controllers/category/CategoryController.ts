import { Request, Response } from "express";
import ICategoryRequest from "../../models/interfaces/category/ICategoryRequest";
import CategoryService from "../../services/category/CategoryService";

export default class CategoryController {
    async createCategory(req: Request, res: Response) {
        try {
            const { name }: ICategoryRequest = req.body;
            const createCategoryService = new CategoryService();


            const category = await createCategoryService.create({ name });
            return res.status(201).json(category);
        } catch (error) {
            console.log(error);
        }
    }

    async editCategory(req: Request, res: Response) {
        try {
            const { name } = req.body;
            const category_id = req.query.category_id as string;

            const editCategoryService = new CategoryService();

            const categoryEdited = await editCategoryService.edit({name, category_id})

            return res.status(200).json(categoryEdited)



        } catch (error) {

        }
    }

    async listCategory(req: Request, res: Response) {
        const showCategoryService = new CategoryService()

        const showCategories = await showCategoryService.list()

        return res.status(200).json(showCategories)
    }

    async removeCategory(req: Request,res: Response) {
        const category_id = req.query.category_id as string;

        const removeCategoryService = new CategoryService()

        const category = removeCategoryService.remove({category_id})

        return res.status(200).json({message: "category removed successfully"})
    }
}


