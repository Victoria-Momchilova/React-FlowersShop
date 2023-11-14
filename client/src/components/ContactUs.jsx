import Button from './MainElements/Button.jsx'
import WhiteBg from './MainElements/WhiteBg.jsx'
import './ContactUs.css'

export default function ContactUs() {
    return (
        <section id='contact-us-section' className="contact-us-wrap">
            <div className="container">
                <div className="row">
                    <WhiteBg className="contact-us-content col-10">
                        <h2>Свържете се с нас</h2>
                        <div className="separator"></div>
                        <h3>We will be happy to help!</h3>
                        <p>Аз съм параграф. Щракнете тук, за да добавите свой собствен текст и да ме редактирате. Това е лесно. Просто щракнете върху „Редактиране на текст“ или щракнете два пъти върху мен, за да добавите свое собствено съдържание и да направите промени в шрифта. Чувствайте се свободни да ме плъзнете и пуснете където желаете на вашата страница. Аз съм чудесно място за вас да разкажете история и да уведомите потребителите си малко повече за вас.</p>
                        <div className='row'>
                            <div className='contact-us-box col-3'>
                                <div className='img-wrap'>
                                    <img src='/images/Homepage/ContactUs/location.svg' />
                                </div>
                                <h4>Контакти</h4>
                                <p>ул. Капчица 18,<br/>
                                    София, България<br/>
                                    тел.: 123-456-7890</p>
                            </div>
                            <div className='contact-us-box col-3'>
                                <div className='img-wrap'>
                                    <img src='/images/Homepage/ContactUs/time.svg' />
                                </div>
                                <h4>Работно време</h4>
                                <p>Пон. - Пет.: 7am - 10pm<br/>
                                    ​​Събота: 8am - 10pm<br/>
                                    Неделя: 8am - 11pm
                                </p>
                            </div>
                            <div className='contact-us-box col-6'>
                                <div className='img-wrap'>
                                    <img src='/images/Homepage/ContactUs/brochure.svg' />
                                </div>
                                <h4>Присъедини се</h4>
                                <form>
                                    <label>Абонирай се за нашата брушура</label>
                                    <input></input>
                                    <Button text='Присъедини се'/>
                                </form>
                            </div>
                        </div>
                    </WhiteBg>
                </div>
            </div>
        </section>
    )
}