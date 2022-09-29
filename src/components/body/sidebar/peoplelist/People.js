import React,{useState,useEffect} from 'react'
import {Avatar} from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {addFriend, acceptRequest, removeFriend} from '../../../../functions/Update'
import db from '../../../../firebase/firebase'

export default function People({usersId ,id, profilePic, username, status}) {
    const [latestMessage,setLatestMessage] = useState('')

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

    useEffect(()=> {
      db.collection('chat').doc(usersId).collection('messages').doc(id).collection('message').orderBy('time','desc')
      .limit(1).onSnapshot((doc) => {setLatestMessage({message:checkForMessage(doc), time: checkForTimestamp(doc)})})


      const checkForMessage = (doc) => {
        try {
            if(doc.docs[0]._delegate !== undefined) {
              return doc.docs[0]._delegate._document.data.value.mapValue.fields.message.stringValue;
            }
        } catch(e) {
            console.error(e)
        }
      }

      const checkForTimestamp = (doc) => {
        try {
          let str = doc.docs[0]._delegate._document.data.value.mapValue.fields.time.timestampValue;
          
          let time = str.slice(str.indexOf('T') + 1, str.lastIndexOf(':'))

            if(doc.docs[0]._delegate !== undefined) {
              return time
            }
        } catch(e) {
            console.error(e)
        }
      }
    },[])
 
  return (
    <>
        <div className="people_container"> 
            {profilePic && <Avatar src={profilePic}/>}
            <h4 className="person_username">{username}</h4>
            {status === 'Message' ?  
              <div className="latest_message_container">
                <div className="latest_message"><span>{latestMessage.message}</span></div>
                <div className="chat_time">{latestMessage.time}</div>
              </div> 
              :
              <button className={status === "Remove" ? "remove_person_button" : "add_friend_button"} onClick={()=> request()}>
                <div>
                  {status === "Remove" ?  ' ' : <PersonAddIcon/>}   {status !== undefined? status: 'Add Friend'}
                </div>
            </button>}     
        </div>
    </>
  )
}
