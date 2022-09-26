import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import db from '../../../../firebase/firebase'
import People from './People'

export default function PeopleList() {
    const [people, setPeople] = useState([]);
    const user = useSelector((state) => state.user)

    useEffect(() => {
        let isMounted = true;
        
        if (isMounted) {
                db.collection("users").where("userId", "!=", user.id).onSnapshot((snapshot) => 
                    setPeople(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data()})))
                );
        }
        return () => { 
            isMounted = false
        }
        
    },[]);

    const checkForKey = (person, id) => {
        
        try{
            if(person[id] !== undefined) {
                return person[id]
            } 
        }catch(e){
            console.error(e)
        }
    }

  return (
    <div className="people_container people_body">
       <h4> People you may know </h4>
       {people.map((person) => (
        <People
            usersId={user.id}
            key={person.id}
            id={person.id}
            profilePic={person.data.profilePic}
            username={person.data.username}
            friends={checkForKey(person.data.friends, user.id)}
        />
       ))
       } 
    </div>
  )
}
