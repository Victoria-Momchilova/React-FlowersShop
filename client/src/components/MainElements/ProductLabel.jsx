import './ProductLabel.css'

export default function ProductLabel(props) {
    return (
        <div className="product-label">
            <img src={props.src} alt=""/>
        </div>
    )
}