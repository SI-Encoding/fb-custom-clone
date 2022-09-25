import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import db from '../../../../firebase/firebase'
import People from './People'

export default function PeopleList() {
    const [people, setPeople] = useState([]);
    const [invites, setInvites] = useState(new Map());
    const [render, setRender] = useState(NaN)
    const user = useSelector((state) => state.user)

    useEffect(() => {
        let isMounted = true;
        
        if (isMounted) {
            db.collection("friends").doc(user.id).get().then((doc) => {
                 
                if(doc.data() !== undefined) {
                    for (let i = 0; i< Object.keys(doc.data()).length; i++) {
                        setInvites(invites.set(Object.keys(doc.data())[i], Object.values(doc.data())[i]))
                    }
                }
            }
            );
            if(render !== NaN) {
                db.collection("users").where("userId", "!=", user.id).onSnapshot((snapshot) => 
                    setPeople(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data()})))
                );
            }
        }
        return () => { 
            isMounted = false
        }
        
    },[]);

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
            invites={invites}
            setInvites={setInvites}
            setRender={setRender}
        />
       ))
       } 
    </div>
  )
}
