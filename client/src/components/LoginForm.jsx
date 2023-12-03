import Button from './MainElements/Button'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/authContext'
import styles from './LogInModal.module.css'

const formInitialState = {
    email: '',
    password: '',
}

export default function LoginForm() {
    const {loginSubmitHandler, loginError} = useContext(AuthContext);
    const [formValues, setFormValues] = useState(formInitialState);
    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const validateInput = (e) => {

    }

    const onLogIn = async (e) => {
        e.preventDefault();
        loginSubmitHandler(formValues);       
    }

    return (
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
                {/* {errors.email && <div className="input-error">Въвели сте грешен email</div>} */}
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
                {/* {errors.password && <div className="input-error">Въвели сте грешна парола</div>} */}
                {loginError !== '' ? <div className={styles.inputError}>{loginError}</div> : ''}
            </div>
            
            <Button handleButton={onLogIn} text="Влез" />
            <span> или <Link to="/register"><Button text="се регистрирай" className="white" /></Link></span>
        </form>
    )
}