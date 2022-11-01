import { Avatar } from '@material-ui/core'
import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';

export default function PostHeader(
  {
    profilePic, 
    username, 
    timestamp, 
    setOpen, 
    open, 
    userId, 
    user, 
    sharedFrom, 
    link, 
    openInNewTab
  }) {
  return (
    <div className='post_top'>
        <Avatar src={profilePic} className='post_avatar'/>
            <div className='post_info_top'>
                <h3>{username}</h3>
                <p>{new Date(timestamp?.toDate()).toUTCString()}</p>        
            </div>
        {sharedFrom !== undefined ? <div style={{marginLeft:'auto'}}><div className='post_info_top'><p className="post_shared_from" onClick={() => openInNewTab(link)}>Shared from {sharedFrom}</p><p style={{marginTop:"22px"}}></p></div></div>:''}  
        {userId !== user.id ? '' : (<MenuIcon style={{color:'var(--fb-theme-colour-arrow)'}} onClick={()=> setOpen(!open)} className='menu_icon'/>)}   
    </div>
  )
}
