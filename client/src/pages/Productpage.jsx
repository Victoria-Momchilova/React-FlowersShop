import { useEffect } from 'react';
import ContactUs from '../components/ContactUs.jsx';
import SingleProduct from '../components/SingleProduct.jsx'
import { useParams } from 'react-router-dom'

export default function Poductpage(props) {
    const {id} = useParams();
    const ClickedProduct = (addedProduct) => {
        props.onClickProduct(addedProduct);
    }

    return (
        <div className="page-wrap">
           <SingleProduct id={id} onClickProduct={ClickedProduct}/>
           <ContactUs />
        </div>
    )
}