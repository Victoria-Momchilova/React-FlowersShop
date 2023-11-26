import ContactForm from "./ContactForm";
import WhiteBg from "./MainElements/WhiteBg";
import './EditProfile.css'
import { useRef, useContext } from "react";
import AuthContext from "../contexts/authContext";
import Button from "./MainElements/Button";

export default function EditProfile() {
    const formRef = useRef(null);
    const {editSubmitHandler} = useContext(AuthContext);

    const onSubmitHandler = (values) => {
        editSubmitHandler(values);
    } 

    return (
        <section className="contact-form-wrap">
            <div className="container">
                <div className="row">
                    <WhiteBg className="contact-form-content col-10">
                        <h2>Моят профил</h2>
                        <div className="separator"></div>
                        <ContactForm formRef={formRef} onSubmitHandler={onSubmitHandler} />
                        <Button handleButton={() => formRef.current.requestSubmit() } text="Запази"/>
                    </WhiteBg>
                </div>
            </div>
        </section>
    )
}