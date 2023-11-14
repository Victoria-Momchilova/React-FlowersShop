import Comments from "./Comments"
import Button from "./MainElements/Button"
import WhiteBg from "./MainElements/WhiteBg"
import './SingleProduct.css'
import * as productService from '../services/productService'
import { useEffect, useState } from "react"

export default function SingleProduct(props) {
    const [product, setProduct] = useState({
        "moreinfo": {}
    });
    const [productCount, setProductCount] = useState('1');

    const onChangeProductCount = (e) => {
        console.log(e.target.value);
        setProductCount(e.target.value);
    }

    const addToCart = (event, id) => {
        let product = {'id': id, 'quantity': Number(productCount) };
        props.onClickProduct(product);
    }

    useEffect(()=>{
        productService.singleProduct(props.id)
            .then(result => setProduct(result))
            .catch(error => console.log(error));
    }, [props.id]);

    return (
        <section className="singleproduct-wrap">
            <div className="container">
                <div className="row">
                    <WhiteBg className="singleproduct-content col-10">
                        <div className="row">
                            <div className="col-4 images-wrap">
                                <img src={`/${product.imageurl}`} alt="Ябълков цвят Амарилис" title="Ябълков цвят Амарилис" />
                            </div>
                            <div className="col-8 info-wrap">
                                <div className="name">{product.name}</div>
                                <div className="price-wrap"><span className="price">{product.price}</span></div>
                                <div className="quantity-wrap">
                                    <label className='quantity-label' htmlFor="quantity">Брой:</label>
                                    <input className='quantity' type="number" id='quantity' name='quantity' value={productCount} onChange={onChangeProductCount} />
                                </div>
                                <div className="btn-wrap">
                                    <Button text="Купи" handleButton={(event)=>{addToCart(event, product.id)}}/>
                                </div>
                                <div className="info">
                                    <div className="infoheading">Описание:</div>
                                    <div className="description">{product.description}</div>
                                    <div className="features">
                                        {product.moreinfo.watering && <div className="feature-box">
                                            <img className="img" src="/images/Productpage/watering.svg" alt="" title="" />
                                            <div className="text">Поливане: {product.moreinfo.watering}</div>
                                        </div>}
                                        {product.moreinfo.humidity && <div className="feature-box">
                                            <img className="img" src="/images/Productpage/humidity.svg" alt="" title="" />
                                            <div className="text">Влажност: {product.moreinfo.humidity}</div>
                                        </div>}
                                        {product.moreinfo.sunlight && <div className="feature-box">
                                            <img className="img" src="/images/Productpage/sun.svg" alt="" title="" />
                                            <div className="text">Слънчева светлина: {product.moreinfo.sunlight}</div>
                                        </div>}
                                        {product.moreinfo.soil && <div className="feature-box">
                                            <img className="img" src="/images/Productpage/soil.svg" alt="" title="" />
                                            <div className="text">Почва: {product.moreinfo.soil}</div>
                                        </div>}
                                        {product.moreinfo.lifetime && <div className="feature-box">
                                            <img className="img" src="/images/Productpage/year.svg" alt="" title="" />
                                            <div className="text">{product.moreinfo.lifetime}</div>
                                        </div>}
                                        {product.moreinfo.liters && <div className="feature-box">
                                            <img className="img" src="/images/Productpage/liters.svg" alt="" title="" />
                                            <div className="text">Обем: {product.moreinfo.liters}</div>
                                        </div>}
                                        {product.moreinfo.width && <div className="feature-box">
                                            <img className="img" src="/images/Productpage/width.svg" alt="" title="" />
                                            <div className="text">Ширина: {product.moreinfo.width}</div>
                                        </div>}
                                        {product.moreinfo.diameter && <div className="feature-box">
                                            <img className="img" src="/images/Productpage/diameter.svg" alt="" title="" />
                                            <div className="text">Диаметър: {product.moreinfo.diameter}</div>
                                        </div>}
                                        {product.moreinfo.height && <div className="feature-box">
                                            <img className="img" src="/images/Productpage/height.svg" alt="" title="" />
                                            <div className="text">Височина: {product.moreinfo.height}</div>
                                        </div>}
                                        
                                    </div>
                                </div>
                            </div>
                            <Comments productId={product.id}/>
                        </div>
                    </WhiteBg>
                </div>
            </div>
        </section>
    )
}