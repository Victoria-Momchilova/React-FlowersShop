import { useContext, useEffect, useImperativeHandle, useState } from 'react'
import Button from './MainElements/Button'
import AuthContext from '../contexts/authContext.jsx'
import ProductsContext from '../contexts/productsContext.jsx'
import './ShoppingCart.css'
import * as orderService from '../services/orderService.js'
import { Link } from 'react-router-dom'

export default function ShoppingList(props) {
    const {isAuth, user, accessToken} = useContext(AuthContext);
    const {cartProductsVal, addProduct, removeProduct, setQuantity} = useContext(ProductsContext);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useImperativeHandle(props.orderRef, () => ({
        async submitOrder() {
            let order = {
                products: cartProducts,
                user: user,
            }
            
            await orderService.setNewOrder(order, accessToken)
                .then(result=>console.log(result))
                .catch(error=>console.log(error));
        }
    }))

    const removeProductHandler = (id) => {
        removeProduct(id);
    }

    const sumCartProductsPrice = () => {
        let prices = [];
        cartProducts.forEach((p)=>{
            let match = p.product.price.match(/(\d+)/);
            if (match) { 
                prices.push(Number(match[0]) * Number(p.quantity)); 
            }
        });
        setTotalPrice(prices.reduce((a, b) => a + b, 0));
    }

    const changeQuantity = (e, id) => {
        setQuantity(id, Number(e.target.value));
    }  

    // const submitOrder = () => {
    //     let order = {
    //         products: cartProducts,
    //         user: user,
    //     }
    //     console.log(order);
    // }

    useEffect(()=>{
        setCartProducts(cartProductsVal);
    }, [cartProductsVal]);

    useEffect(()=>{
        sumCartProductsPrice();
    }, [cartProducts]);

    return (
        <div className='shopping-cart-content'>
            <div className="heading-wrap">
                <h1>Пазарска чанта:</h1>
                <div className="separator"></div>
            </div>
            <div className="shopping-cart">
                {cartProducts.length === 0 ? <div className='empty'>Чантата е празна!</div> : cartProducts.map(({ product, quantity }, index) => {
                    return (
                        <div className='cart-product-wrap' key={product.id}>
                            <Link to={`/products/${product.id}`} className="link-wrap">
                                <img src={`/${product.imageurl}`} />
                                <div className='cart-product-name'>{product.name}</div>
                            </Link>
                            <div className='cart-product-quantity-wrap'>
                                <label className='cart-product-quantity-label' htmlFor={"quantity-" + product.id}>Брой:</label>
                                <input className='cart-product-quantity' type="number" id={"quantity-" + product.id} name='quantity' value={quantity} onChange={(e) => { changeQuantity(e, product.id) }} />
                            </div>
                            <div className='cart-product-price'>{product.price}</div>
                            <Button handleButton={() => { removeProductHandler(product.id) }} className="close small white" text="x" />
                        </div>
                    )
                })}
            </div>
            <div className='shopping-cart-total'>
                <div className='price'>Общо: {totalPrice} лв.</div>
            </div>
        </div>
    )
}