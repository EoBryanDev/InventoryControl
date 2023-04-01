import { Request, Response } from "express";
import ISaleProductRequest from "../../models/interfaces/sale/ISaleProductRequest";
import SaleProductService from "../../services/sale/SaleProductService";

export default class SaleProductController {
    async sellProduct(req: Request, res: Response) {
        const product_id = req.query.product_id as string;

        const { amount }: ISaleProductRequest = req.body;

        const saleProductService = new SaleProductService();
        const sellProduct = await saleProductService.saleProduct({amount,product_id})

        return res.status(200).json(sellProduct)
    }
}
