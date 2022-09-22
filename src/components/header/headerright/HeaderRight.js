import React from 'react'
import {Avatar, IconButton} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HeaderDropDownMenu from '../headerdropdownmenu/HeaderDropDownMenu'

export default function HeaderRight({user, setLogoutPopup, logoutPopup, signOutRef}) {
  return (
    <div className = "header_right">
        <div className= "header_info">
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
