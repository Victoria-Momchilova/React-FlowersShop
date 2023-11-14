import { Link } from 'react-router-dom'
import WhiteBg from './MainElements/WhiteBg'
import Button from './MainElements/Button'
import styles from './LogIn.module.css'
import { useState } from 'react'

const formInitialState = {
    email: '',
    password: '',
}

export default function LogIn(props) {
    const [formValues, setFormValues] = useState(formInitialState);
    const [errors, setErrors] = useState({});

    const closeLogInHandler = () => {
        props.logInCloseClicked();
    }

    const changeHandler = (e) => {

    }

    const validateInput = (e) => {

    }

    return (
        <WhiteBg className={styles.logInWrap}>
            <Button handleButton={closeLogInHandler} className={`${styles.closeLogIn} small white`} text="x"/>
            <form>
                <div className={`${styles.fgroup} form-group`}>
                    <label htmlFor="logemail">Email </label>
                    <input
                        type="email"
                        className="form-control"
                        id="logemail"
                        name="email"
                        placeholder="Email"
                        onChange={changeHandler}
                        onBlur={validateInput}
                        value={formValues.email}
                    />
                    {errors.email && <div className="input-error">Въвели сте грешен email</div>}
                </div>
                <div className={`${styles.fgroup} form-group`}>
                    <label htmlFor="logpassword">Парола </label>
                    <input
                        type="password"
                        className="form-control"
                        id="logpassword"
                        name="password"
                        placeholder="Парола"
                        onChange={changeHandler}
                        onBlur={validateInput}
                        value={formValues.password}
                    />
                    {errors.password && <div className="input-error">Въвели сте грешна парола</div>}
                </div>
                <Button text="Влез" />
                <span> или <Link to="/register"><Button text="се регистрирай" className="white" /></Link></span>
            </form>
        </WhiteBg>
    )
}