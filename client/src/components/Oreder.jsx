import ShoppingList from "./ShoppingList";
import WhiteBg from '../components/MainElements/WhiteBg'
import Button from "./MainElements/Button";
import { useRef, useContext } from "react";
import AuthContext from "../contexts/authContext";
import { Link } from "react-router-dom";
import './Order.css'

export default function Order() {
    const {isAuth, user} = useContext(AuthContext);
    const orderRef = useRef(null);

    const onSubmitHandler = (value) => {
        if (orderRef.current) {
            orderRef.current.submitOrder();
        }
    }

    return (
        <section className="order-wrap">
            <div className="container">
                <div className="row">
                    <WhiteBg className="order-content col-10">
                        <ShoppingList orderRef={orderRef} />
                        <div className="address-wrap">
                            <div>
                                <div>Адрес за доставка:</div>
                                <div>{user.shippingcountry}, {user.shippingcity}, ул. {user.shippingstreet} {user.shippingstreetNumber} </div>
                            </div>
                            <div style={{marginLeft: 'auto'}}><Link to='/profile'><Button className="white" text="Промени адреса" /></Link></div>
                        </div>
                        
                        {isAuth && <Button className="" text="Завърши поръчката" handleButton={onSubmitHandler}/>}
                        {!isAuth && <Link to="/login"><Button className="white" text="Влез и завършиш поръчката"/></Link>}
                    </WhiteBg>
                </div>
            </div>
        </section>
    )
}