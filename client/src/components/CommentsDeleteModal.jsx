import WhiteBg from "./MainElements/WhiteBg";
import Button from "./MainElements/Button";
import './CommentsDeleteModal.css';

export default function CommentsEditModal(props) {
    
    return (
        <div className="modal-wrap">
            <div className="backdrop" onClick={props.closeCommentsDeleteModalHandler}></div>            
            <WhiteBg className="modal-box">
                <Button handleButton={props.closeCommentsDeleteModalHandler} className="closedelete small white" text="x"/>
                <div className="text">Искаш ли да изтриеш коментара?</div>
                <Button handleButton={props.deleteComment} text="Да" />
                <Button handleButton={props.closeCommentsDeleteModalHandler} className="white" text="Не" />
            </WhiteBg>
        </div>
    )
}