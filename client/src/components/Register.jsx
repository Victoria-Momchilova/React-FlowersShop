import ContactForm from './ContactForm.jsx'
import WhiteBg from './MainElements/WhiteBg.jsx'
import Button from './MainElements/Button.jsx'
import './Register.css'
import { useRef, useContext } from 'react'
import AuthContext from "../contexts/authContext";

export default function Register() {
    const formRef = useRef(null);
    const {registerSubmitHandler} = useContext(AuthContext);

    const onSubmitHandler = (values) => {
        registerSubmitHandler(values);
    } 

    return (
        <section className="register-wrap">
            <div className="container">
                <div className="row">
                    <WhiteBg className="register-content col-10">
                        <h2>Регистрация</h2>
                        <div className="separator"></div>
                        <ContactForm formRef={formRef} onSubmitHandler={onSubmitHandler}/>                        
                        <Button handleButton={() => formRef.current.requestSubmit() } text="Регистрирай се"/>
                    </WhiteBg>
                </div>
            </div>
        </section>
    )
}