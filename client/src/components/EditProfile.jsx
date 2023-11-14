import ContactForm from "./ContactForm";
import WhiteBg from "./MainElements/WhiteBg";
import './EditProfile.css'

export default function EditProfile() {
    return (
        <section className="contact-form-wrap">
            <div className="container">
                <div className="row">
                    <WhiteBg className="contact-form-content col-10">
                        <h2>Моят профил</h2>
                        <div className="separator"></div>
                        <ContactForm />
                    </WhiteBg>
                </div>
            </div>
        </section>
    )
}