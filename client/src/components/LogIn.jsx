import WhiteBg from "./MainElements/WhiteBg";
import LoginForm from "./LoginForm";
import './LogIn.css'

export default function LogIn() {

    return (

        <section className="login-wrap">
            <div className="container">
                <div className="row">
                    <WhiteBg className="login-content col-10">
                        <h2>Вход</h2>
                        <div className="separator"></div>
                        <LoginForm />
                    </WhiteBg>
                </div>
            </div>
        </section>

    )
}