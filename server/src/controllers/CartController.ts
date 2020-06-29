import { Request, Response } from 'express';
import knex from '../database/connection';

class CartController
{

    // Adiciona um item ao carrinho de um usuário
    async add(request: Request, response: Response)
    {
        const {
            user_id,
            product_id,
            quantity,
        } = request.body;

        
        const cartProduct = {
            user_id,
            product_id,
            quantity,
        }
        
        const productInCart = await knex('cart').where('user_id', cartProduct.user_id).where('product_id', cartProduct.product_id).first();

        // Se o produto nunca foi inserido por esse usuário, insere o produto
        if(!productInCart)
        {
            const insertedProduct = await knex('cart').insert(cartProduct);
            const insertion_id = insertedProduct[0];

            return response.json({
                insertion_id,
                ...cartProduct
            });
        }

        const product = await knex('products').where('id', cartProduct.product_id).first();
        
        let modifiedProductInCart;
        // Se o produto já estiver na tabela, pega a nova quantidade e adiciona a antiga
        if(productInCart.quantity + cartProduct.quantity > product.quantity)
        {
            modifiedProductInCart = {
                user_id: productInCart.user_id,
                product_id: productInCart.product_id,
                quantity: parseInt(product.quantity),
            }
        }
        else
        {
            modifiedProductInCart = {
                user_id: productInCart.user_id,
                product_id: productInCart.product_id,
                quantity: productInCart.quantity + cartProduct.quantity,
            }
        }

        const modifiedProduct = await knex('cart')
            .where('id', productInCart.id)
            .update(modifiedProductInCart)
        const insertion_id = modifiedProduct;

        return response.json({
            insertion_id,
            ...modifiedProductInCart
        });
    }

    // Remove itens do carrinho
    async remove(request: Request, response: Response)
    {
        const {
            user_id,
            product_id,
            quantity,
        } = request.body;

        
        const cartProduct = {
            user_id,
            product_id,
            quantity,
        }

        const productInCart = await knex('cart').where('user_id', cartProduct.user_id).where('product_id', cartProduct.product_id).first();

        // Se o produto não estiver no carrinho retorna com erro
        if(!productInCart)
        {
            return response.json({
                error: "Produto não encontrado no carrinho"
            });
        }

        if(cartProduct.quantity > 0)
        {
            // Se o produto já estiver na tabela, pega a quantity e remove da antiga. Se for ficar igual ou menor que 0, deleta.
            if(productInCart.quantity - cartProduct.quantity > 0)
            {
                const modifiedProductInCart = {
                    user_id: productInCart.user_id,
                    product_id: productInCart.product_id,
                    quantity: productInCart.quantity - cartProduct.quantity,
                }
    
                const modifiedProduct = await knex('cart')
                    .where('id', productInCart.id)
                    .update(modifiedProductInCart)
    
                return response.json({
                    modifiedProduct,
                    ...modifiedProductInCart
                });
            }
        }

        const deletedProduct = await knex('cart')
            .where('id', productInCart.id)
            .delete();

        return response.json({
            200: "Produto deletado com sucesso",
            deletedProduct
        });

    }

    // Retorna a lista de produtos no carrinho do usuário
    async index(request: Request, response: Response)
    {
        const { id } = request.params;
        const productsInCart = await knex('cart').where('user_id', id);

        // Pega os ids dos produtos que estão no carrinho
        const productsIds = productsInCart.map(product => {
            return product.product_id;
        })

        // Pega os ids e as quantidades no carrinho de cada produto
        const quantity = productsInCart.map(product => {
            return { product_id: product.product_id, quantity: product.quantity }
        })

        // Consulta cada produto no banco de dados. Armazena as promisses na variável productsPromisses
        const productsPromisses = productsIds.map(async productId => {
            const product = await knex('products').where('id', productId).first()
            return product;
        });

        // A variável products vai ser um vetor de promisses. A variável resultado recebe o valor de retorno dessas promisses
        (async () => {
            const products = await Promise.all(productsPromisses);

            return response.json({
                products,
                quantity
            });
          })();
    }
}

export default CartController;