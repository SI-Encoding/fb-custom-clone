import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete';

function ChatMessage({id, username, message, time, deleteComment, img, fileName, url, userId}) {
    const user = useSelector((state) => (state.user))
    
    const deleteFunc = () => {
        deleteComment(id)
    }

    return (
        <div className='chat_Message_container' >
            {userId === user.id && <DeleteIcon onClick={deleteFunc} /> }
            <p  className={`${userId === user.id ? 'chat_receiver' : 'chat_message'}`}>
            <span className="chat_name">{username}</span>
            {img ? <><div> <img style={{width:'300px'}} src={img}/></div> 
            <div>{message}  <span className="chat_timestamp">{new Date(time?.toDate()).toUTCString()}</span></div> </>
            : url? <><div> <a href={url}>{fileName}</a></div> 
            <div>{message}  <span className="chat_timestamp">{new Date(time?.toDate()).toUTCString()}</span></div> </>
            :<>{message}  <span className="chat_timestamp">{new Date(time?.toDate()).toUTCString()}</span></>}
            </p>
         </div>                                                           
    )
}

export default ChatMessage
