import { Link } from "react-router-dom";
import WhiteBg from "./MainElements/WhiteBg";
import Button from "./MainElements/Button";
import styles from './ProfileMenu.module.css';


export default function ProfileMenu(props) {
    const closeProfileHandler = () => {
        props.profileCloseClicked();
    }

    return (
        <WhiteBg className={styles.profileMenuWrap}>
            <Button handleButton={closeProfileHandler} className={`${styles.closeLogIn} small white`} text="x"/>
            <Link to="/logout">Изход</Link>
        </WhiteBg>
    )
}