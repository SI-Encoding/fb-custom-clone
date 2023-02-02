import React from 'react'
import SearchIcon from '@material-ui/icons/Search';

export default function HeaderLeft() {
  return (
    <div className = "header_left">
        <img src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png" alt="fb_logo"/>
        <div className="header__input">
            {/* <SearchIcon style={{color:'var(--fb-theme-colour-arrow)'}}/> */}
            <input placeholder="Welcome to Fb Clone" type="text" disabled/>
        </div>
    </div>
  )
}
