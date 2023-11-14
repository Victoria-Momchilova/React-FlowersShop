import WhiteBg from './MainElements/WhiteBg'
import './AboutUs.css'

export default function AboutUs() {
    return (
        <section id='about-us-section' className="about-us-wrap">
            <div className="container">
                <div className="row">
                    <WhiteBg className="about-us-content col-10">
                        <h2>За нас</h2>
                        <div className="separator"></div>
                        <h3>We love what we do!</h3>
                        <p>Аз съм параграф. Щракнете тук, за да добавите свой собствен текст и да ме редактирате. Това е лесно. Просто щракнете върху „Редактиране на текст“ или щракнете два пъти върху мен, за да добавите свое собствено съдържание и да направите промени в шрифта. Чувствайте се свободни да ме плъзнете и пуснете където желаете на вашата страница. Аз съм чудесно място за вас да разкажете история и да уведомите потребителите си малко повече за вас.</p>
                    </WhiteBg>
                </div>
            </div>
        </section>
    )
}