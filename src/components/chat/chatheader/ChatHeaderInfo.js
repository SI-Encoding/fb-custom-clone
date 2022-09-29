import React from 'react'
import {Avatar} from '@material-ui/core'
import { useDispatch } from 'react-redux'

export default function ChatHeaderInfo({chatUserInfo}) {
    console.log(chatUserInfo)
  return (
    <div className="people_container"> 
    <h4 className="person_username">{chatUserInfo.username}</h4>
    
</div>          
  )
}
