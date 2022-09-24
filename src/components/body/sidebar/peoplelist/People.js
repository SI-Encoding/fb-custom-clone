import React from 'react'
import {Avatar} from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import db from '../../../../firebase/firebase'

export default function people({usersId,id,profilePic, username}) {

    db.collection('friends').doc(usersId).set({
        id: true
    })
  return (
    <div>
        <div className="people_container"> 
            {profilePic && <Avatar src={profilePic}/>}
            <h4 className="person_username">{username}</h4>
            <button className="add_friend_button">
                <div >
                    <PersonAddIcon/> Add Friend
                </div>
            </button>
            <button className='remove_person_button'>
                Remove
            </button>
        </div>
    </div>
  )
}
