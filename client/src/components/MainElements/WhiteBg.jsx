import './WhiteBg.css'

export default function WhiteBg(props) {
    return (
        <section className={`${props.className} whitebg`}>{props.children}</section>
    )
}