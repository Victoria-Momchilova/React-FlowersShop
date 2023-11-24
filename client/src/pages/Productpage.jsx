import { useEffect } from 'react';
import ContactUs from '../components/ContactUs.jsx';
import SingleProduct from '../components/SingleProduct.jsx'
import { useParams } from 'react-router-dom'

export default function Poductpage() {
    const {id} = useParams();

    return (
        <div className="page-wrap">
           <SingleProduct id={id} />
           <ContactUs />
        </div>
    )
}