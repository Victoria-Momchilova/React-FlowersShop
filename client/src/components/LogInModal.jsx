import WhiteBg from './MainElements/WhiteBg'
import Button from './MainElements/Button'
import styles from './LogInModal.module.css'
import LoginForm from './LoginForm'


export default function LogInModal(props) {
   
    const closeLogInHandler = () => {
        props.logInCloseClicked();
    }

    return (
        <WhiteBg className={styles.logInWrap}>
            <Button handleButton={closeLogInHandler} className={`${styles.closeLogIn} small white`} text="x"/>
            <LoginForm />
        </WhiteBg>
    )
}