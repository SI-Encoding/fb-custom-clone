import React, {useState,useEffect} from 'react'
import './ChatList.css'
import db from '../../../firebase/firebase'
import { useDispatch, useSelector } from 'react-redux';
import People from '../../body/sidebar/peoplelist/People'
import {set_chat_user_info} from '../../../rootReducer'

export default function ChatList() {
    
      const user = useSelector((state) => state.user)
      const [requests, setRequests] = useState([])  
      const dispatch = useDispatch()
    
      useEffect(() => {
        
        db.collection("users").where("userId", "!=", user.id).onSnapshot((snapshot) => 
        {
          resetState()
          setRequests(snapshot.docs.filter((doc) => ({ id: checkForId(doc.data(),user.id), data: checkForKey(doc.data(), user.id)}))
          .filter((doc) => doc.data().friends !== undefined)
          .map((doc) => ({id:doc.id, data:doc.data()})))
        }
      );
    
      const resetState = () => {
          setRequests([])
      }
    
      const checkForId = (person, id) => {
        try {
            if(person.friends[id] !== undefined) {
              return id;
            }
        } catch(e) {
            console.error(e)
        }
      }
      
     const checkForKey = (person, id) => {
        try{
            if(person.friends[id] !== undefined) {
                if(person.friends[id] === 'Accept Request') {
                  return person
                }
            }
        }catch(e){
            console.error(e)
        }
    }},[])

  const fetchChatInfo = (id, username, profilePic) => {
      dispatch({
        type: set_chat_user_info,
        chatUserInfo: {id:id, username: username, profilePic: profilePic}
    })
  } 

  return (
    <div className="chat_list" >
         {requests.map((person) => (
                    <div className="chat_item" onClick={() => fetchChatInfo(person.id, person.username, person.profilePic)}>
                    { person.data.friends[user.id] === 'Remove' &&
                        <People
                            usersId={user.id}
                            key={person.id}
                            id={person.id}
                            profilePic={person.data.profilePic}
                            username={person.data.username}
                            status={'Message'}
                        />
                    }
                    </div>
                ))
                }  
    </div>
  )
}
