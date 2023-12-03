import { useContext, useEffect } from "react"
import * as orderService from '../services/orderService'
import { useState } from "react";
import AuthContext from "../contexts/authContext";
import WhiteBg from "./MainElements/WhiteBg";
import './UserOrders.css'

export default function UserOrders() {
    const {_id} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);


    useEffect(()=>{
        orderService.getAllOrders(_id)
            .then(result=>{
                console.log(result)
                setOrders(result);
            })
            .catch(error=>console.log(error));

    }, []);

    return (
        <section className="orders-wrap">
            <div className="container">
                <div className="row">
                    <WhiteBg className="orders-content col-10">
                        <h1>Поръчки</h1>
                        <div className="separator"></div>
                        {orders.length > 0 ? orders.map(order=>{
                            return(
                                <div className="order-row">Поръчка {order._id}</div>
                            )
                        }) : <div className="order-row"> Няма направени поръчки </div>}
                        
                   
                    </WhiteBg>
                </div>
            </div>
        </section>
    )
}