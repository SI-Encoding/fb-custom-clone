import React from 'react'
import {Avatar} from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {addFriend, acceptRequest, removeFriend} from '../../../../functions/Update'
export default function People({usersId ,id, profilePic, username, status}) {

    const request = () => {
      switch(status){
        case 'Accept Request':
            acceptRequest(usersId, id, 'users')
            break;
        case 'Remove':      
            removeFriend(usersId, id, 'users')
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
