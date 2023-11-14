import { Link } from 'react-router-dom'
import styles from './HeaderMenu.module.css'
import WhiteBg from './MainElements/WhiteBg'
import Button from './MainElements/Button'

export default function HeaderMenu(props) {

    const closeHeaderMenuHandler = () => {
        props.headerMenuCloseClicked();
    }

    return (
        <WhiteBg className={styles.heaaderMenuWrap}>
            <Button handleButton={closeHeaderMenuHandler} className={`${styles.closeMenu} small white`} text="x"/>
            <Link to="/" className={styles.link}>Начало</Link>
            <Link to="/about-us" className={styles.link}>За нас</Link>
            <Link to="/products" className={styles.link}>Магазин</Link>
            <Link to="/contact-us" className={styles.link}>Контакти</Link>
        </WhiteBg>
    )
}