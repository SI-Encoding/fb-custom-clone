import React,{useEffect, useState} from 'react'
import db from '../../../../../firebase/firebase'
import {useSelector, useDispatch} from 'react-redux'
import Comment from './comment/Comment'
import FlipMove from 'react-flip-move'
import './comment/Comment.css'

function DisplayComments({theId}) {
    const [comments, setComments] = useState([])    
    const user = useSelector((state) => (state.user))
    const dispatch = useDispatch()

    useEffect( () => {
        db.collection('posts').doc(theId).collection('comments').orderBy('time','desc').onSnapshot((snapshot) => {
            setComments(snapshot.docs.map((doc)=> ({id: doc.id, data: doc.data()})))
        })
    },[theId])

    return (
        <div>
        {comments.length > 0? comments.map((displayComments) => 
            <FlipMove typeName={null}>
                <Comment key = {displayComments.data.id}
                    commentId = {displayComments.id}
                    message = {displayComments.data.message}
                    time = {displayComments.data.time}
                    user = {displayComments.data.user}
                    userImage = {displayComments.data.userImage}
                    postId = {theId}/>
            </FlipMove>
        ) : <div className='displayComments_container' style={{paddingLeft: 0, alignItems: 'center'}}>
                <div className="displayComments_area">
                    <div className='display_message'>
                        <p style={{fontSize: 'small', color: 'var(--fb-theme-colour-grey)'}}> There are currently no comments. Be the first to leave a comment.</p>
                    </div>
                </div>
            </div>
        }
        </div>
    )   
}

export default DisplayComments
