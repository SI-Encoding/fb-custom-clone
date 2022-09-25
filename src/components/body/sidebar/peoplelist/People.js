import React,{useEffect, useState} from 'react'
import {Avatar} from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import db from '../../../../firebase/firebase'

export default function People({usersId ,id, profilePic, username, invites, setInvites, setRender}) {

    const addFriend = () => {
        db.collection('friends').doc(usersId).set({
            [id]: 'Friend Request Sent'
        }, { merge: true })
  
      setInvites(invites.set(id,'Friend Request Sent'))
      setRender(Math.floor(Math.random() * 5))
    }

    
  return (
    <div>
        <div className="people_container"> 
            {profilePic && <Avatar src={profilePic}/>}
            <h4 className="person_username">{username}</h4>
            <button className="add_friend_button" onClick={()=> addFriend()}>
                <div>
                 <PersonAddIcon/> {invites.get(id) !== undefined? invites.get(id): 'Add Friend'}
                </div>
            </button>
            {/* <button className='remove_person_button'>
                Remove
            </button> */}
        </div>
    </div>
  )
}
