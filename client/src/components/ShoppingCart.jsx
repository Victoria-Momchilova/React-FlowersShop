import './ShoppingCart.css'
import WhiteBg from "./MainElements/WhiteBg.jsx"
import Button from './MainElements/Button'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../contexts/authContext.jsx'
import { Link } from 'react-router-dom'
import ShoppingList from './ShoppingList.jsx'

export default function ShoppingCart(props) {
    const {isAuth} = useContext(AuthContext);

    const closeCartHandler = () => {
        props.cartCloseClicked();
    }
    
    return (
        <WhiteBg className="shopping-cart-wrap">
            <Button handleButton={closeCartHandler} className="closecart small white" text="x"/>
            <ShoppingList />
            {isAuth && <Link to="/order"><Button className="" text="Завърши поръчката" /></Link>}
            {!isAuth && <Link to="/login"><Button className="white" text="Влез и завършиш поръчката"/></Link>}
        </WhiteBg>
    )
}