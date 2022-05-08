import React, {useState} from 'react'
import './WriteAComment.css'
import {useSelector} from 'react-redux'
import {Avatar} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import db from '../../../../../firebase/firebase'
import firebase from 'firebase/compat'
import { IconButton } from '@material-ui/core';

function WriteAComment({theId, setDisplayComment}) {
    const user = useSelector((state) => state.user)
    const [comment, setComment] = useState('')    

    const submitComment = (e) => {
        e.preventDefault()    
        db.collection('posts').doc(theId).collection('comments').add({
            message: comment,    
            time: firebase.firestore.FieldValue.serverTimestamp(),        
            user: user.displayName,        
            userImage: user.photoURL            
        })             
        setDisplayComment(true)            
        setComment('')            
    }        
        
    return (           
        <>
        {/* render writing a comment */ }        
        <div className='comment_container'>        
            <div className='comment_area'>        
                <Avatar src={user.photoURL} className='comment_avatar'/>            
                    <div className="comment_username">
                        <h3>{user.displayName}</h3>
                    </div>
            </div>        
            <div className="comment_form">        
                <form>       
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} className='comment_textarea' placeholder='Write a comment . . .'/>        
                    <IconButton disabled={!comment} className='icon_container' size='small'>           
                        <SendIcon className={`icon ${comment ? 'active' : 'inactive'}`} type='submit' onClick={submitComment} disabled={!comment}/>            
                    </IconButton>            
                </form>          
            </div>        
        </div>            
        </>       
    )        
}    

export default WriteAComment
