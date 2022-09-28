import React,{useState, useEffect} from 'react'
import {Avatar, IconButton} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HeaderDropDownMenu from '../headerdropdownmenu/HeaderDropDownMenu'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import db from '../../../firebase/firebase'
import NotificationsMenu from './notificationsmenu/NotificationsMenu';

export default function HeaderRight({user, setLogoutPopup, logoutPopup, signOutRef}) {
  const [notifications, setNotifications] = useState([])
  const [requests, setRequests] = useState([])  
  const [menu, setMenu] = useState(false)

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
    <div className = "header_right">
      {/* Notifications */}
        <div className={"notification"} onClick={() => setMenu(true)}>
          <PeopleAltIcon style={{fontSize: '30px'}}/> 
          <span style={{background: notifications.length !== 0 ? '#e40000' : 'none'}}>
            {notifications.length !== 0 ? notifications.length > 99 ? '99+': notifications.length : ''}
          </span>
        </div>
        {menu && <NotificationsMenu notifications={notifications} requests={requests} setMenu={setMenu}/>}
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
