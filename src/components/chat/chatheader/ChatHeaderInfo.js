import React from 'react'
import {Avatar} from '@material-ui/core'
import {Button} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import {set_chat_user_info} from '../../../rootReducer'

export default function ChatHeaderInfo({chatUserInfo}) {
const dispatch = useDispatch()

const returnToChatList = () => {
    dispatch({
        type: set_chat_user_info,
        chatUserInfo: null
    })
}

  return (
    <div className="chat_header_info">
        <div className="people_container">
            <Avatar src={chatUserInfo.profilePic}/> 
            <h4 className="person_username">{chatUserInfo.username}</h4>
            <Button style={{marginLeft: 'auto'}} onClick={() => returnToChatList()}>Back</Button>
        </div>          
    </div>
  )
}
