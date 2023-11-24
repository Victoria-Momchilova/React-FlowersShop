import Button from './Button.jsx'
import ProductLabel from './ProductLabel.jsx'
import './Product.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import ProductsContext from '../../contexts/productsContext.js';

export default function Product(props) {
    const {addProduct} = useContext(ProductsContext);
    let src;

    switch (props.category) {
        case 'indoor':
            src = 'images/Products/icons/indoor.svg';
            break;
        case 'outdoor':
            src = 'images/Products/icons/outdoor.svg';
            break;
    }

    switch (props.enviroment) {
        case 'indoor':
            src = 'images/Products/icons/indoor.svg';
            break;
        case 'outdoor':
            src = 'images/Products/icons/outdoor.svg';
            break;
    }

    const addToCart = (event, id) => {
        let product = {'id': id, 'quantity': 1 };
        addProduct(product);
    }
    
    return (
        <div className={`product-wrap ${props.className}`}>
            {(props.label) && <ProductLabel src={src} />}
            <Link to={`/products/${props.id}`} className="link-wrap">
                <div className="img-wrap">
                    <img src={props.imageurl} title={props.name} alt={props.name}/>
                </div>
                <h4>{props.name}</h4>
            </Link>
            <div className='price'>{props.price}</div>
            <div className='button-wrap'>
                <Button text='Купи' handleButton={(event)=>{addToCart(event, props.id)}}/>
            </div>
        </div>
    )
}