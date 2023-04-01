import IEditProductRequest from "../../models/interfaces/product/IEditProductRequest";
import IProductRequest from "../../models/interfaces/product/IProductRequest";
import prismaClient from "../../prisma";

interface IListProductById {
    category_id: string;
}

interface IRemoveProduct {
    product_id: string;
}
export default class ProductService {
    async create({
        amount,
        banner,
        category_id,
        description,
        name,
        price,
    }: IProductRequest) {
        const product = await prismaClient.product.create({
            data: {
                name: name,
                price: price,
                description: description,
                banner: banner,
                category_id: category_id,
                amount: +amount,
            },
        });

        return product;
    }

    async edit({
        name,
        amount,
        banner,
        description,
        price,
        product_id,
    }: IEditProductRequest) {
        const productEdit = await prismaClient.product.update({
            where: {
                id: product_id,
            },
            data: {
                name: name,
                amount: +amount,
                banner: banner,
                description: description,
                price: price,
            },
        });

        return productEdit;
    }

    async listByCategory({ category_id }: IListProductById) {
        const listProductById = await prismaClient.product.findMany({
            where: {
                category_id: category_id,
            },
        });

        return listProductById;
    }

    async listAll() {
        const products = await prismaClient.product.findMany({
            select: {
                id: true,
                name: true,
                amount: true,
            },
            orderBy: {
                created_at: "desc",
            },
        });
        return products;
    }

    async remove({ product_id }: IRemoveProduct) {
        if (!product_id) {
            throw new Error("Product Id was not sent!");
        }

        const removeProduct = await prismaClient.product.delete({
            where: {
                id: product_id,
            },
        });

        return removeProduct;
    }
}
