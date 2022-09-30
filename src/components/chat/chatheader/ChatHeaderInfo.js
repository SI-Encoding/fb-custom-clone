import React, {useState, useEffect} from 'react'
import {Avatar} from '@material-ui/core'
import {Button} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import {set_chat_user_info} from '../../../rootReducer'
import db from '../../../firebase/firebase'

export default function ChatHeaderInfo({chatUserInfo}) {
const dispatch = useDispatch()
const [activity, setActivity] = useState()

const returnToChatList = () => {
    dispatch({
        type: set_chat_user_info,
        chatUserInfo: null
    })
}

useEffect(() => {
  db.collection('users').doc(chatUserInfo.id).onSnapshot((doc) => {setActivity((doc._delegate._document.data.value.mapValue.fields.online.booleanValue))})
}, [])

  return (
    <div className="chat_header_info">
        <div className="people_container">
            <Avatar src={chatUserInfo.profilePic}/> 
            <h4 className="person_username" style={{width:'91px'}}>{chatUserInfo.username}</h4>
            <span className={activity? "person_online" : "person_offline"}>{activity? 'Online': 'Offline'}</span>
            <Button style={{marginLeft: 'auto'}} onClick={() => returnToChatList()}>Back</Button>
        </div>          
    </div>
  )
}
