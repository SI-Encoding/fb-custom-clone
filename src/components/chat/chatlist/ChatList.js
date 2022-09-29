import React, {useState,useEffect} from 'react'
import './ChatList.css'
import db from '../../../firebase/firebase'
import { useSelector } from 'react-redux';
import People from '../../body/sidebar/peoplelist/People'

export default function ChatList() {
    
      const user = useSelector((state) => state.user)
      const [notifications, setNotifications] = useState([])
      const [requests, setRequests] = useState([])  
    
      let activeRequests = []
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
          setNotifications([])
          setRequests([])
          activeRequests = []
      }
    
      const checkForId = (person, id) => {
        try {
            if(person.friends[id] !== undefined) {
              return id;
            }
        } catch(e) {
    
        }
      }
      
     const checkForKey = (person, id) => {
        try{
            if(person.friends[id] !== undefined) {
                if(person.friends[id] === 'Accept Request') {
                  activeRequests.push(person.friends[id])
                  setNotifications(activeRequests)
                  return person
                }
            }
        }catch(e){
            console.error(e)
        }
    }},[])

  return (
    <div className="chat_list">
         {requests.map((person) => (
                    <div style={{background:'white'}}>
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
