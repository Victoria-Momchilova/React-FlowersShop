import './ShoppingCart.css'
import WhiteBg from "./MainElements/WhiteBg.jsx"
import Button from './MainElements/Button'
import { useEffect, useState } from 'react'

export default function ShoppingCart(props) {
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const removeProductHandler = (id) => {
        props.removeProduct(id);
    }

    const closeCartHandler = () => {
        props.cartCloseClicked();
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
        props.setQuantity(id, Number(e.target.value));
    }   
    
    useEffect(()=>{
        setCartProducts(props.cartProducts);
    }, [props.cartProducts]);

    useEffect(()=>{
        sumCartProductsPrice();
    }, [cartProducts]);
    
    return (
        <WhiteBg className="shopping-cart-wrap">
            <Button handleButton={closeCartHandler} className="closecart small white" text="x"/>
            <div className='shopping-cart-content'>
                <div className="heading-wrap">
                    <h1>Пазарска чанта:</h1>
                    <div className="separator"></div>
                </div>
                <div className="shopping-cart">
                    {cartProducts.length === 0 ? <div className='empty'>Чантата е празна!</div> : cartProducts.map(({product, quantity}, index)=>{
                        return (
                            <div className='cart-product-wrap' key={product.id}>
                                <img src={`/${product.imageurl}`}/>
                                <div className='cart-product-name'>{product.name}</div>
                                <div className='cart-product-quantity-wrap'>
                                    <label className='cart-product-quantity-label' htmlFor="quantity">Брой:</label>
                                    <input className='cart-product-quantity' type="number" id='' name='quantity' value={quantity} onChange={(e)=>{changeQuantity(e, product.id)}}/>
                                </div>
                                <div className='cart-product-price'>{product.price}</div>
                                <Button handleButton={()=>{removeProductHandler(product.id)}} className="close small white" text="x"/>
                            </div>
                        )
                    })}
                </div>
                <div className='shopping-cart-total'>
                    <div className='price'>Общо: {totalPrice} лв.</div>
                    <Button className="" text="Завърши поръчката"/>
                </div>
            </div>
           
        </WhiteBg>
    )
}