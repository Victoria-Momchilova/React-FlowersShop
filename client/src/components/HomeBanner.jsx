import Button from './MainElements/Button.jsx'
import './HomeBanner.css'
import { Link } from 'react-router-dom'

export default function HomeBanner() {
    return (
        <section className="homebanner">
            <div className="container">
                <div className='row'>
                    <div className='col-12'>
                        <div className="slogan">Spring is in the Air</div>
                        <div className="separator"></div>
                        <h1 className='heading'>Направи<br />градината си<br />цветна</h1>
                        <Link to="/products"><Button text='Пазарувай сега'/></Link>
                    </div>
                </div>
            </div>
        </section>
    )
}