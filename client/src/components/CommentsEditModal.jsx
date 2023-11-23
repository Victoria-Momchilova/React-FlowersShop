import WhiteBg from "./MainElements/WhiteBg";
import Button from "./MainElements/Button";
import './CommentsEditModal.css';
import { useEffect, useState } from "react";
import * as commentService from '../services/commentService'

export default function CommentsEditModal(props) {
    const [comment, setComment] = useState({});

    const commentEditHandler = (e) => {
        setComment({ ...comment, text: e.target.value });    
    }

    const setEditHandler = (e) => {
        e.preventDefault();
        props.editNewComment(comment);
    }

    useEffect(()=>{
        commentService.getEditComment(props.commentEditModalID)
            .then(result => setComment(result))
            .catch(error=>console.log(error));
    }, [props.commentEditModalID]);
    
    return (
        <div className="modal-wrap">
            <div className="backdrop" onClick={props.closeCommentsEditModalHandler}></div>            
            <WhiteBg className="modal-box">
                <Button handleButton={props.closeCommentsEditModalHandler} className="closeedit small white" text="x"/>
                <form className="form-edit-comment">
                
                    <div className='form-group'>
                        <label htmlFor='editcomment'>Коментар:</label>
                        <textarea className="text form-control" id="editcomment" name="addcomment" rows="4" onChange={commentEditHandler} value={comment.text}/>
                    </div>
              
                    <Button handleButton={setEditHandler} text="Запази коментар" />
                </form>  
            </WhiteBg>
        </div>
    )
}