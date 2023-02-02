import React,{useEffect, useRef, useState} from 'react'
import {Button} from '@material-ui/core'
import { useSelector } from 'react-redux';
import '../error/ErrorPopUp.css'
import db from '../../../firebase/firebase'
import People from '../sidebar/peoplelist/People';
import {sharedPost} from '../../../functions/Update'

function SharePostPopup({setShare, share, image, message}) {
  const sharePopUpRef = useRef(null)
  const [checked, setChecked] = useState({})
  const user = useSelector((state) => state.user)
  const [requests, setRequests] = useState([])  
  
  const handleCheck = (e, personsId, profilePic, username) => {
    setChecked({...checked, [personsId]: {checked: e.target.checked, profilePic: profilePic, username: username}})
  }
 
  const sharePosts = () => {
    setShare(!share)
    for (const [key, value] of Object.entries(checked)){
        value.checked === true && sharedPost("shared", key, image, message, value.username, value.profilePic)
    }
 }

  useEffect(()=> {
    const popUpUpdated = e => {
      if (sharePopUpRef.current && !sharePopUpRef.current.contains(e.target)) {
        setShare(!share)
      }
    }

    window.addEventListener('click', popUpUpdated)
    return () => {
      window.removeEventListener('click', popUpUpdated)
    }
  }, [share])

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
}

return ()=> {
    setRequests([])
}
},[])

  return (
    <div ref ={sharePopUpRef} className='popup_error_container' style={{height: 'fit-content'}}>
      <div className='popup_error_top'>
        <h3 className='popup_error_title'>Select friend(s) to share with</h3>
      </div>
      <div className='popup_error_preview' style={{height: 'fit-content'}}>
        <div>      
         {requests.map((person) => (
                    <div className="chat_item share_item" >
                    { person.data.friends[user.id] === 'Remove' &&
                        <People
                            usersId={person.data.personsId}
                            id={person.id}
                            profilePic={person.data.profilePic}
                            username={person.data.username}
                            status={'Share'}
                            checked = {checked[person.id]}
                            handleCheck = {handleCheck}
                        />
                    }
                    </div>
                ))
                }  
    
        </div>
      </div>
        <div className='popup_error_buttons'>
          <Button type ='submit' onClick={()=>  sharePosts()}>Share</Button>
        </div>
    </div>
  )
}

export default SharePostPopup