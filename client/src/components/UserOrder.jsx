import { useParams, Link } from "react-router-dom"
import WhiteBg from "./MainElements/WhiteBg"
import { useEffect, useState } from "react";
import * as orderService from '../services/orderService'
import './UserOrder.css'

export default function UserOrder() {
    const {id} = useParams();
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        orderService.getOrder(id)
            .then(result=>setProducts(result.products))
            .catch(error=>console.log(error));
    }, []);

    return (
        <section className="order-wrap">
            <div className="container">
                <div className="row">
                    <WhiteBg className="order-content col-10">
                        <h1>Поръчка {id}</h1>
                        <div className="separator"></div>
                        
                        {products.map(product=>{
                            return (
                                <div className='order-product-wrap' key={product.product.id}>
                                    <Link to={`/products/${product.product.id}`} className="link-wrap">
                                        <img src={`/${product.product.imageurl}`} />
                                        <div className='product-name'>{product.product.name}</div>
                                    </Link>
                                    <div className='product-quantity-wrap'>
                                        <div className='product-quantity-label'>Брой:</div>
                                        <div className='product-quantity'>{product.quantity}</div>
                                    </div>
                                    <div className='product-price'>{product.product.price}</div>
                                    
                                </div>
                            )
                        })}
                   
                    </WhiteBg>
                </div>
            </div>
        </section>
    )
}