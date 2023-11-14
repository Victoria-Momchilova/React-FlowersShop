import OurStore from "../components/OurStore.jsx"
import ContactUs from "../components/ContactUs.jsx"

export default function Store(props) {
    const ClickedProduct = (addedProduct) => {
        props.onClickProduct(addedProduct);
    }

    return (
        <div className="page-wrap">
            <OurStore products={props.products} onClickProduct={ClickedProduct}/>
            <ContactUs />
        </div>
    )
}