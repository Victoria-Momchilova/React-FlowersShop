import HomeBanner from '../components/HomeBanner.jsx'
import AboutUs from '../components/AboutUs.jsx'
import FeaturedProducts from '../components/FeaturedProducts.jsx'
import ContactUs from '../components/ContactUs.jsx'

export default function Homapege(props) {

    return (
        <div className='page-wrap'>
            <HomeBanner />
            <AboutUs />
            <FeaturedProducts />
            <ContactUs />
        </div>
    )
}