import React,{useState, useEffect} from 'react'
import {Avatar, IconButton} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HeaderDropDownMenu from '../headerdropdownmenu/HeaderDropDownMenu'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import db from '../../../firebase/firebase'

export default function HeaderRight({user, setLogoutPopup, logoutPopup, signOutRef}) {
  const [notifications, setNotifications] = useState([])  
  let trackRequests = []

  useEffect(() => {
    
    db.collection("users").where("userId", "!=", user.id).onSnapshot((snapshot) => 
    {
      resetState()
      snapshot.docs.map((doc) => ({ id: doc.id, data: checkForKey(doc.data().friends, user.id)}))
      }
  );

  const resetState = () => {
      setNotifications([])
      trackRequests = []
  }

 const checkForKey = (person, id) => {
    try{
        if(person[id] !== undefined) {
            if(person[id] === 'Accept Request') {
              trackRequests.push(person[id])
              setNotifications(trackRequests)
            }
        } 
    }catch(e){
        console.error(e)
    }
}},[])

 
   
  return (
    <div className = "header_right">
        <div className={"notification"}>
          <PeopleAltIcon style={{fontSize: '30px'}}/> 
          <span style={{background: notifications.length !== 0 ? '#e40000' : 'none'}}>
            {notifications.length !== 0 ? notifications.length > 99 ? '99+': notifications.length : ''}
          </span>
        </div>
        <div className="header_info">
            <Avatar src={user.picture}/>
            <h4>{user.name}</h4>
        </div>
        {/* SignOut */}
        <IconButton onClick={()=> setLogoutPopup(!logoutPopup)}>
            <ExpandMoreIcon style={{color:'var(--fb-theme-colour-arrow)'}} className={`header_arrow ${logoutPopup? 'active' : 'inactive'}`}/>
        </IconButton>   
        {logoutPopup && <div ref={signOutRef}> <HeaderDropDownMenu setLogoutPopup={setLogoutPopup}/> </div>}
    </div>
  )
}
