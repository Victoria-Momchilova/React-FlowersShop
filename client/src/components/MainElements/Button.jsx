import './Button.css'

export default function Button(props) {
    return  (
        <button className={`button${props.className ? " " + props.className : ""}`} onClick={props.handleButton} >{props.text}</button>
    )
}