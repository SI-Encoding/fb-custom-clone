import React from 'react'
import {Avatar} from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import db from '../../../../firebase/firebase'

export default function People({usersId ,id, profilePic, username, friends}) {

    const request = () => {
      switch(friends){
        case 'Accept Request':
           db.collection('users').doc(usersId).set({
                friends: {[id]: 'Remove'}
            }, {merge: 'true'})
           db.collection('users').doc(id).set({
                friends: {[usersId]: 'Remove'}
            }, {merge: 'true'})
            break;
        case 'Remove':
            db.collection('users').doc(usersId).set({
                friends: {[id]: 'Add Friend'}  
            }, {merge: 'true'})        
            db.collection('users').doc(id).set({        
                friends: {[usersId]: 'Add Friend'}     
            }, {merge: 'true'})        
            break;
        default:
            db.collection('users').doc(usersId).set({
                friends: {[id]: 'Accept Request'}
        }, {merge: 'true'})
            db.collection('users').doc(id).set({
                friends: {[usersId]: 'Friend Request Sent'}
        }, {merge: 'true'})
            break;
      }
    }

  return (
    <div>
        <div className="people_container"> 
            {profilePic && <Avatar src={profilePic}/>}
            <h4 className="person_username">{username}</h4>
            <button className="add_friend_button" onClick={()=> request()}>
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
