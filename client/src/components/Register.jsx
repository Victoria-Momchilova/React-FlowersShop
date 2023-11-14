import ContactForm from './ContactForm.jsx'
import WhiteBg from './MainElements/WhiteBg.jsx'
import Button from './MainElements/Button.jsx'
import './Register.css'
import { useRef } from 'react'

export default function Register() {
    const formRef = useRef(null);

    return (
        <section className="register-wrap">
            <div className="container">
                <div className="row">
                    <WhiteBg className="register-content col-10">
                        <h2>Регистрация</h2>
                        <div className="separator"></div>
                        <ContactForm formRef={formRef} />                        
                        <Button handleButton={() => formRef.current.requestSubmit() } text="Регистрирай се"/>
                    </WhiteBg>
                </div>
            </div>
        </section>
    )
}