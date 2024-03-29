import { Avatar } from '@material-ui/core'
import UpdateIcon from '@material-ui/icons/Update';
import React, { useState, forwardRef, useRef } from 'react'
import {useSelector } from 'react-redux'
import { IconButton } from '@material-ui/core';
import './Comment.css'
import '../../writeacomment/WriteAComment.css'
import db from '../../../../../../firebase/firebase'
import firebase from 'firebase/compat'
import {deletePostCommentFromFirebaseCollection} from '../../../../../../functions/Delete'
import {updatePostComment} from '../../../../../../functions/Update'

const  Comment = forwardRef(({postId, commentId,message,time,user,userImage},ref) => {
    const [displayMenuItems, setDisplayMenuItems] = useState(false)
    const username = useSelector((state) => (state.user))
    const editRef = useRef(null)
    const [editPop, setEditPop] = useState(false)
    const [comment, setComment] = useState('')

    const editComment = (e) => {
       setEditPop(!editPop)
       e.preventDefault()
       updatePostComment('posts', postId, 'comments', commentId, comment, username.name, username.picture)
       setComment('')
    }

    const deleteComment = () => {
        deletePostCommentFromFirebaseCollection('posts', 'comments', postId, commentId)
    }

    return (
        <>
            {/*render edit box*/}
            <div className='edit_box' ref={editRef}>
                {editPop && <div className='comment_container'>
                    <div className='comment_area'>
                        <Avatar src={username.picture} className='comment_avatar'/>     
                        <div className="comment_username">   
                            <h3>{username.name}</h3>
                        </div>
                    </div>  
                    <div className="comment_form">
                        <form>
                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} className='comment_textarea' placeholder='Update comment . . .'/>
                                <IconButton disabled={!comment} className='icon_container' size='small'>
                                    <UpdateIcon className={`icon_update ${comment ? 'active' : 'inactive'}`} type='submit' onClick={editComment} />
                                </IconButton>
                        </form>
                    </div>
                </div>
                }
            </div> 

            {/*render comments*/}      
            <div ref={ref} className='displayComments_container'>
                <div onMouseEnter={() => setDisplayMenuItems(true)} onMouseLeave={() => setDisplayMenuItems(false)} className="displayComments_area">
                    <Avatar src={userImage} className='display_avatar'/>
                    <div className='display_text'>
                        <h3 className='display_username'>{user}</h3>
                            <div className='display_message'>
                                <p>{message}</p>
                                {displayMenuItems && user === username.name && 
                                <div className='display_menu'> 
                                    <p onClick={() => setEditPop(!editPop)}>Edit</p> 
                                    <p onClick={deleteComment}>Delete</p> 
                                </div>
                                }
                            </div>
                    </div> 
                    <p className='display_time'>{new Date(time?.toDate()).toUTCString()}</p>
                </div>
            </div>
        </>
    )
}
)

export default Comment
