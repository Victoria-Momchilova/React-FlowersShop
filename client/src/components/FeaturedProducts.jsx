import Product from './MainElements/Product.jsx'
import Button from './MainElements/Button.jsx'
import './FeaturedProducts.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import ProductsContext from '../contexts/productsContext.jsx';

export default function FeaturedProducts(props) {
    const {products} = useContext(ProductsContext);
    
    return (
        <section className='featured-products'>
            <div className='container'>
                <div className='row'>
                    <div className='heading-wrap col-10'>
                        <h2>Нови продукти</h2>
                        <div className="separator"></div>
                        <h3>We love our plants!</h3>
                    </div>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                  
                    {products.map(product => {
                        if(product.featured != undefined) {
                            return  (<Product 
                                className='col-12 col-md-4 col-lg-3'
                                key={product.id}
                                id={product.id}
                                name={product.name} 
                                imageurl={product.imageurl} 
                                price={product.price} 
                                label={true}
                                category={product.category}
                            />)
                        }
                        return null;
                    })}

                    <div className='button-wrap'>
                        <Link to="/products"><Button className='white' text='Виж всички'/></Link>
                    </div>
                </div>
            </div>
        </section>
    )
}