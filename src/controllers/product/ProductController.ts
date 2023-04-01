import { Request, Response, NextFunction } from "express";
import IEditProductRequest from "../../models/interfaces/product/IEditProductRequest";
import IProductRequest from "../../models/interfaces/product/IProductRequest";
import ProductService from "../../services/product/ProductService";

export default class ProductController {
    async createProduct(req: Request, res: Response) {
        const {
            amount,
            banner,
            category_id,
            description,
            name,
            price,
        }: IProductRequest = req.body;

        const createProductService = new ProductService();

        if (!req.file) {
            throw new Error("Error sending image");
        } else {
            const { originalname, filename: banner } = req.file;
            const product = await createProductService.create({
                name,
                price,
                description,
                banner,
                category_id,
                amount,
            });

            return res.status(201).json(product);
        }
    }

    async editProduct(req: Request, res: Response) {
        const {
            amount,
            banner,
            description,
            name,
            price,
            product_id,
        }: IEditProductRequest = req.body;

        const editProductService = new ProductService();

        const productEdited = editProductService.edit({
            amount,
            banner,
            description,
            name,
            price,
            product_id,
        });

        return res.status(200).json(productEdited);
    }

    async listProductByCategory(req: Request, res: Response) {
        const category_id = req.query.category_id as string;

        const listProductByIdService = new ProductService();

        const listProduct = await listProductByIdService.listByCategory({ category_id });

        return res.status(200).json(listProduct);
    }

    async listAllProducts(req: Request, res: Response) {

        const listAllProductsService = new ProductService();

        const allProducts = await listAllProductsService.listAll()

        return res.status(200).json(allProducts)
    }

    async removeProduct(req: Request, res: Response) {
        const product_id = req.query.product_id as string;

        const removeProductService = new ProductService()

        const productDeleted = await removeProductService.remove({product_id})

        return res.status(204).json(productDeleted)
    }
}
