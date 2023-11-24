import { useState, useEffect } from 'react';
import styles from './Comments.module.css';
import Button from './MainElements/Button';
import * as commentService from '../services/commentService'
import CommentsEditModal from './CommentsEditModal';
import CommentsDeleteModal from './CommentsDeleteModal';
import { useContext } from 'react';
import AuthContext from '../contexts/authContext';

const newCommentFormInitialState = {
    productId: "",
    // name: "",
    imageurl: "/images/Comments/person.svg",
    text: ""
}

const formRegex = {
    // name: /([\s\S]{3,})/,
    text: /([\s\S]{2,})/
}

export default function Comments(props) {
    const {isAuth, accessToken, _id, username} = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [commentEditModal, setCommentEditModal] = useState(false);
    const [commentDeleteModal, setCommentDeleteModal] = useState(false);
    const [commentEditModalID, setCommentEditModalID] = useState('');
    const [commentDeleteModalID, setCommentDeleteModalID] = useState('');
    const [newCommentForm, setNewCommentForm] = useState(newCommentFormInitialState);
    const [errors, setErrors] = useState({});

    // EDIT
    const commentEditModalHandler = (e, id) => {
        setCommentEditModal(state => !state);
        window.scrollTo(0, 0);
        setCommentEditModalID(id);
    }

    const closeCommentsEditModalHandler = (e) => {
        setCommentEditModal(false);
    }

    const editNewComment = async (data) => {
        
        await commentService.setEditComment(data, accessToken)
            .then((result) => {
                let nc = comments.map((item)=>{
                    if(item._id === result._id) {
                        return {...item, text: result.text};
                    }
                    return item;
                })
                setComments(nc);
            })
            .catch(error=>console.log(error));
        setCommentEditModal(false);
    }

    // CREATE
    const newCommentHandler = (e) => {
        setNewCommentForm(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const validateInput = (e) => {
        if(!(formRegex[e.target.name]).test(e.target.value)) {
            setErrors(state => ({
                ...state,
                [e.target.name]: true
            }));
        } else {
            setErrors(state => ({
                ...state,
                [e.target.name]: false
            }));
        }
    }
    
    const clearNewCommentForm = () => {
        $.each(newCommentForm, function(key, value){
            if(key != "imageurl" && key != "productId") {
                newCommentForm[key] = "";
            }
        });
    }

    const addNewComment = async (e) => {
        e.preventDefault();
        let validate = true;
        let validateErrors = [];

        $('.form-add-comment input, .form-add-comment textarea').each(function(){
            if(this.value === '') {
                validate = false;
                validateErrors.push(this.name);
                setErrors(state=>({
                    ...state,
                    [this.name]: true
                }))
            }
        });
    
        Object.keys(errors).forEach((key)=>{
            if(errors[key]){
                validate = false;
                validateErrors.push(key);            
                return false;
            } 
        });
        
        if(validate) {
            await commentService.setNewComment(newCommentForm, accessToken)
                .then(result => setComments(state => [...state, { ...result, owner: {username: username} }]))
                .catch(error => console.log(error));
            clearNewCommentForm();
        } else {
            $('input[name=' + validateErrors[0] + '], textarea[name=' + validateErrors[0] + ']').focus();
        }
    }

    // DLELETE
    const commentDeleteModalHandler = (e, id) => {
        setCommentDeleteModal(state => !state);
        window.scrollTo(0, 0);
        setCommentDeleteModalID(id);
    }

    const closeCommentsDeleteModalHandler = (e) => {
        setCommentDeleteModal(false);
    }

    const deleteComment = async (e) => {
        e.preventDefault();
        await commentService.deleteComment(commentDeleteModalID, accessToken)
            .then(result=>setComments(state=>state.filter(comment => comment._id !== commentDeleteModalID)))
            .catch(error=>console.log(error));
        setCommentDeleteModal(false);
    }

    useEffect(()=>{
        commentService.getAllComments(props.productId)
            .then(result => setComments(result))
            .catch(error => console.log(error));
        setNewCommentForm({...newCommentForm, productId: props.productId})
    }, [props.productId]);
    
    return (
        <div className={`col-12 ` + styles["comments-wrap"]} style={isAuth || comments[0] ? {borderTop: "2px solid #cecece"} : {}}>
            {commentEditModal && <CommentsEditModal editNewComment={editNewComment} commentEditModalID={commentEditModalID} closeCommentsEditModalHandler={closeCommentsEditModalHandler} />}
            {commentDeleteModal && <CommentsDeleteModal deleteComment={deleteComment} closeCommentsDeleteModalHandler={closeCommentsDeleteModalHandler} />}
            {comments[0] && <div className={styles["heading"]}>Коментари:</div>}
            {comments[0] && comments.map((comment)=>{
                return (
                    <div className={styles["comment-box"]} key={comment._id}>
                        {comment._ownerId === _id && <div className={styles["control"]}>
                            <div className={styles["edit"]} onClick={(e)=>commentEditModalHandler(e, comment._id)}><img className={styles["control-img"]} src='/images/Comments/edit.svg'/></div>
                            <div className={styles["delete"]} onClick={(e)=>commentDeleteModalHandler(e, comment._id)}><img className={styles["control-img"]} src='/images/Comments/delete.svg'/></div>
                        </div>}
                        <div className={styles["person"]}>
                            <img className={styles["img"]} src={comment.imageurl} alt={"Снимката на " + comment.owner.username} title={"Снимката на " + comment.owner.username} />
                            <div className={styles["name"]}>{comment.owner.username}</div>
                        </div>
                        <div className={styles["comment"]}>{comment.text}</div>
                    </div>
                )
            })}
           
            {isAuth && <div className={styles["new-comment-box"]}>
                <div className={styles["heading"]}>Напиши коментар:</div>
                <form className="form-add-comment">
                    {/* <div className={'form-group ' + styles["form-group"]}>
                        <label htmlFor='name'>Име: <span className={styles["mandatory"]}>*</span></label>
                        <input className={styles["name"] + " form-control"} type='text' id='name' name='name' onChange={newCommentHandler} onBlur={validateInput} value={newCommentForm.name} />
                        {errors.name && <div className={styles["input-error"]}>Името трябва да е над 2 символа</div>}
                    </div> */}
                    <div className={'form-group ' + styles["form-group"]}>
                        <label htmlFor='addcomment'>Коментар: <span className={styles["mandatory"]}>*</span></label>
                        <textarea className={styles["text"] + ` form-control`} id="addcomment" name="text" rows="4" onChange={newCommentHandler} onBlur={validateInput} value={newCommentForm.text}/>
                        {errors.text && <div className={styles["input-error"]}>Коментара трябва да е над 1 символ</div>}
                    </div>
              
                    <Button handleButton={addNewComment} text="Добави коментар" />
                </form>              
            </div>}


        </div>                            
    )
}