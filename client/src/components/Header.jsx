import { Link } from 'react-router-dom';
import './Header.css'
import HeaderMenu from './HeaderMenu';
import ShoppingCart from './ShoppingCart'
import LogIn from './LogIn';
import { useState, useEffect, useContext } from "react";
import AuthContext from '../contexts/authContext';
import ProfileMenu from './ProfileMenu';


export default function Header(props) {
    const {username, isAuth} = useContext(AuthContext);
    const [cartOpened, setCartOpened] = useState(false);
    const [headerMenuOpened, setHeaderMenuOpened] = useState(false);
    const [logInOpened, setLogInOpened] = useState(false);
    const [profileOpend, setProfileOpened] = useState(false);
    const [cartProductsCount, setCartProductsCount] = useState(0);

    const cartClicked = () => {
        setCartOpened(!cartOpened);
    }
    const cartCloseClicked = () => {
        setCartOpened(false);
    }
    const calcCartProductsCount = () => {
        let counts = [];
        props.cartProducts.forEach((p)=>{
            counts.push(p.quantity);
        });
        setCartProductsCount(counts.reduce((a, b) => a + b, 0));
    }
    const setQuantity = (id, newquantity) => {
        props.setQuantity(id, newquantity);
    }
    const headerMenuClicked = () => {
        setHeaderMenuOpened(!headerMenuOpened);
    }
    const headerMenuCloseClicked = () => {
        setHeaderMenuOpened(false);
    }
    const logInClicked = () => {
        setLogInOpened(!logInOpened);
    }
    const logInCloseClicked = () => {
        setLogInOpened(false);
    }
    const profileClicked = () => {
        setProfileOpened(!profileOpend);
    }
    const profileCloseClicked = () => {
        setProfileOpened(false);
    }

    useEffect(()=>{
        calcCartProductsCount();
    }, [props.cartProducts]);

    return (
        <header className='header-wrap'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='logo-wrap col-2'>
                        <Link to='/'>
                            <img src="/images/Blossoms-logo.svg" alt="logo" />
                        </Link>
                    </div>
                    <div className="header-menu col-10">
                        {!isAuth && <div className='menu-item' onClick={logInClicked}>
                            <img src='/images/Header/login.svg' alt='login' />
                            <span>Вход</span>
                        </div>}
                        {isAuth && <div className='menu-item' onClick={profileClicked}>
                            <img src='/images/Header/profile.svg' alt='profile' />
                            <span>{username}</span>
                        </div>}
                        <div className='menu-item bag' onClick={cartClicked}>
                            <img src='/images/Header/bag.svg' alt='bag' className='bag' />
                            <span>{cartProductsCount}</span>
                        </div>
                        <div className='menu-item' onClick={headerMenuClicked}>
                            <img src='/images/Header/burger.svg' alt='burger-menu' />
                        </div>
                    </div>
                </div>
            </div>
            {cartOpened && <ShoppingCart 
                products={props.products} 
                removeProduct={props.onClickRemoveFromCart} 
                cartProducts={props.cartProducts} 
                cartCloseClicked={cartCloseClicked} 
                setQuantity={setQuantity}
            />}
            {headerMenuOpened && <HeaderMenu headerMenuCloseClicked={headerMenuCloseClicked}/>}
            {logInOpened && <LogIn logInCloseClicked={logInCloseClicked}/>}
            {/* // TODO Profile menu links */}
            {profileOpend && <ProfileMenu profileCloseClicked={profileCloseClicked}/>}
        </header>
    )
}