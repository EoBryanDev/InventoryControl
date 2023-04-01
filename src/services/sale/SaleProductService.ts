import ISaleProductRequest from "../../models/interfaces/sale/ISaleProductRequest";
import prismaClient from "../../prisma";

export default class SaleProductService {
    async saleProduct({amount, product_id}: ISaleProductRequest) {
        if (!amount || !product_id) {
            throw new Error("Datas was not found! Fill it correctly!");
        }

        const queryProduct = await prismaClient.product.findFirst({
            where: {
                id: product_id
            },
        })

        if (queryProduct?.amount > amount && amount > 0) {
            const newAmount = (queryProduct?.amount - amount);
            const saveSale = await prismaClient.product.update({
                where: {
                    id: product_id
                },
                data:{
                    amount: newAmount
                },
                select: {
                    id:true,
                    name: true,
                    amount: true
                }
            })

            return saveSale
        } else{
            throw new Error("It was not possible make a sale transaction!");

        }
    }
}
