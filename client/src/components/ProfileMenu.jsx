import { Link } from "react-router-dom";
import WhiteBg from "./MainElements/WhiteBg";
import Button from "./MainElements/Button";
import styles from './ProfileMenu.module.css';
import { useContext, useEffect } from "react";
import AuthContext from "../contexts/authContext";


export default function ProfileMenu(props) {
    const {logoutSubmitHandler, isAuth} = useContext(AuthContext);
    const closeProfileHandler = () => {
        props.profileCloseClicked();
    }

    useEffect(()=>{
        if(!isAuth){
            closeProfileHandler();
        }        
    }, [isAuth]);

    return (
        <WhiteBg className={styles.profileMenuWrap}>
            <Button handleButton={closeProfileHandler} className={`${styles.closeLogIn} small white`} text="x"/>
            <Link to="/profile" className={styles.link}>Профил</Link>
            <Link to="/orders" className={styles.link}>Поръчки</Link>
            <div className={styles.link} onClick={logoutSubmitHandler}>Изход</div>
        </WhiteBg>
    )
}