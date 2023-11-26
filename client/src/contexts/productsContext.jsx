import { createContext, useState, useEffect } from "react";

import * as productService from '../services/productService.js'

const ProductsContext = createContext();

export const ProductsProvider = ({children}) => {
    const [shuffleProducts, setShuffleProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    
    const removeProduct = (id) => {
        const remainedProducts = cartProducts.filter((product)=>{
            return product.product.id != id;
        });

        setCartProducts(remainedProducts);
    }

    const addProduct = (product) => {
        let findProduct = shuffleProducts.filter((p)=>{
        return p.id === product.id;
        });

        let isProductInCart = cartProducts.filter((p)=>{
        return p.product.id === product.id;
        });

        if(isProductInCart.length > 0){
        setCartProducts((oldProducts)=>{
            const result = oldProducts.map((productset)=>{
                if(productset.product.id === product.id) {
                    const quantity = productset.quantity + product.quantity;
                    return {...productset, quantity: quantity}
                } 
                return productset;
            })
            return result;
        });
        } else {
        let findProductSet = {product: findProduct[0], quantity: product.quantity};
        setCartProducts((oldProducts)=>{
            return [...oldProducts, findProductSet];
        });
        }
    }

    const setQuantity = (id, newquantity) => {
        if(newquantity != 0) {
        setCartProducts((oldProducts)=>{
            const result = oldProducts.map((productset)=>{
                if(productset.product.id === id) {
                    const quantity = (newquantity);
                    return {...productset, quantity: quantity}
                } 
                return productset;
            })
            return result;
        });
        } else {
        removeProduct(id);
        }
    } 

    useEffect (()=>{
        productService.getAll()
        .then(result => setShuffleProducts(result.sort(() => Math.random() - 0.5)))
        .catch(error => console.log(error));
    }, []);

    const productsValues = {
        products: shuffleProducts,
        cartProductsVal: cartProducts,
        addProduct,
        removeProduct,
        setQuantity
    }

    return(
        <ProductsContext.Provider value={productsValues}>
            {children}
        </ProductsContext.Provider>
    );
}

ProductsContext.displayName = 'ProductsContext';

export default ProductsContext;