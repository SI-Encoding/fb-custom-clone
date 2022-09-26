import React from 'react'
import {Avatar} from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import db from '../../../../firebase/firebase'

export default function People({usersId ,id, profilePic, username, friends}) {

    console.log(friends)
    const addFriend = () => {
      
      db.collection('users').doc(usersId).set({
        friends: {[id]: 'Accept Request'}
      }, {merge: 'true'})
      db.collection('users').doc(id).set({
        friends: {[usersId]: 'Friend Request Sent'}
      }, {merge: 'true'})

    }

    
  return (
    <div>
        <div className="people_container"> 
            {profilePic && <Avatar src={profilePic}/>}
            <h4 className="person_username">{username}</h4>
            <button className="add_friend_button" onClick={()=> addFriend()}>
                <div>
                    <PersonAddIcon/> {friends !== undefined? friends: 'Add Friend'}
                </div>
            </button>
            {/* <button className='remove_person_button'>
                Remove
            </button> */}
        </div>
    </div>
  )
}
