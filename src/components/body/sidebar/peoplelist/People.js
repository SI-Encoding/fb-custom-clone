import React from 'react'
import {Avatar} from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {addFriend, acceptRequest, removeFriend} from '../../../../functions/Update'
import {useDispatch} from 'react-redux';
import {set_chat_user_info} from '../../../../rootReducer'

export default function People({usersId ,id, profilePic, username, status}) {
    const dispatch = useDispatch()

    const request = () => {
      switch(status){
        case 'Accept Request':
            acceptRequest(usersId, id, 'users')
            break;
        case 'Remove':      
            removeFriend(usersId, id, 'users')
            break;
        case 'Message':
            dispatch({
                type: set_chat_user_info,
                chatUserInfo: {id:id, username: username, profilePic: profilePic}
            })
            break;
        default:
            addFriend(usersId, id, 'users')
            break;
      }
    }

  return (
    <div>
        <div className="people_container"> 
            {profilePic && <Avatar src={profilePic}/>}
            <h4 className="person_username">{username}</h4>
            <button className={status === "Remove" ? "remove_person_button" : "add_friend_button"} onClick={()=> request()}>
                <div>
                  {status === "Remove" ?  ' ' : <PersonAddIcon/>}   {status !== undefined? status: 'Add Friend'}
                </div>
            </button>
        </div>
    </div>
  )
}
