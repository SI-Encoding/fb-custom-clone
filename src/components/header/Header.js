import React, {useState, useRef, useEffect} from 'react'
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import StorefrontIcon from '@material-ui/icons/Storefront';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import {Avatar, IconButton} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ForumIcon from '@material-ui/icons/Forum';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useStateValue} from '../../StateProvider'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import DropDownSignOutPopup from './dropdownsignoutpopup/DropDownSignOutPopup';

function Header() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch(); 
    const [homePage, setHomePage] = useState(true)
    const [flagPage, setFlagPage] = useState(false)
    const [myPostsPage, setMyPostsPage] = useState(false)
    const [gifsPage, setGifsPage] = useState(false)
    const [otherUsersPostsPage, setOtherUsersPostsPage] = useState(false)
    const [logoutPopup, setLogoutPopup] = useState(false)
    const signOutRef = useRef()
    
    const homePageActivated = () => {
        setHomePage(true)
        setFlagPage(false)
        setMyPostsPage(false)
        setGifsPage(false)
        setOtherUsersPostsPage(false)
    }

    const flagPageActivated = () => {
        setGifsPage(false)
        setHomePage(false)
        setFlagPage(true)
        setMyPostsPage(false)
        setOtherUsersPostsPage(false)
    }

    const myPostsPageActivated = () => {      
        setHomePage(false)
        setFlagPage(false)
        setMyPostsPage(true)
        setGifsPage(false)
        setOtherUsersPostsPage(false)
    }

    const gifsPageActivated = () => {  
        setHomePage(false)
        setFlagPage(false)
        setMyPostsPage(false)
        setGifsPage(true)
        setOtherUsersPostsPage(false)
    }

    const otherUsersPostsPageActivated = () => {
        setHomePage(false)
        setFlagPage(false)
        setMyPostsPage(false)
        setGifsPage(false)
        setOtherUsersPostsPage(true)
    }

    useEffect( () => {
        const pageUpdater = e => {
            if (logoutPopup && signOutRef.current && !signOutRef.current.contains(e.target)){
                setLogoutPopup(!logoutPopup)
            }
        }

        window.addEventListener('click', pageUpdater)
        return ()=> {
            window.removeEventListener('click', pageUpdater)
        }
    },[logoutPopup])

    return (
        <div className = "header"> 
            <div className = "header_left">
                <img src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png" alt="fb_logo"/>
            <div className="header__input">
                <SearchIcon/>
                <input placeholder="Search Facebook" type="text" disabled/>
            </div>
            </div>
            <div className = "header_center">
           {/* link to homepage*/}
           <Link to="/" style={{ color: `${homePage? '#2e81f4' : 'gray'}`, textDecoration: 'none'}}> 
                <div onClick = {homePageActivated} className={ `header_option  ${homePage? 'active' : 'inactive'}`}>
                    <HomeIcon fontSize="large"/> 
                </div>
            </Link>
            {/* move to flagPage*/}           
            <Link to="favourites" style={{ color: `${flagPage? '#2e81f4' : 'gray'}`, textDecoration: 'none'}}>
                <div onClick = {flagPageActivated} className={ `header_option ${flagPage? 'active' : 'inactive'}`}>
                    <FlagIcon fontSize="large"/> 
                </div>
            </Link>
            {/* move to gifpage */}
            <Link to="gifposts" style={{ color: `${gifsPage? '#2e81f4' : 'gray'}`, textDecoration: 'none'}}>
                <div onClick = {gifsPageActivated} className={ `header_option ${gifsPage? 'active' : 'inactive'}`}>
                    <SubscriptionsIcon fontSize="large"/> 
                </div>
            </Link>
            {/* move to myposts */}  
            <Link to="myposts" style={{ color: `${myPostsPage? '#2e81f4' : 'gray'}`, textDecoration: 'none'}}> 
                <div onClick = {myPostsPageActivated} className={ `header_option ${myPostsPage? 'active' : 'inactive'}`}>
                    <StorefrontIcon fontSize="large"/> 
                </div>
            </Link>
             {/* move to otherusersposts */}         
             <Link to="otherusersposts" style={{ color: `${otherUsersPostsPage? '#2e81f4' : 'gray'}`, textDecoration: 'none'}}> 
                <div onClick = {otherUsersPostsPageActivated} className={ `header_option ${otherUsersPostsPage? 'active' : 'inactive'}`}>
                    <SupervisedUserCircleIcon fontSize="large"/> 
                </div>
             </Link>
             </div>
             <div className='header_divider'></div>
             {/* signout */ }
             <div className = "header_right">
                <div className= "header_info">
                    <Avatar src={user.photoURL}/>
                    <h4>{user.displayName}</h4>
             </div>
    
            {/* <IconButton>
                <AddIcon/>
                </IconButton>
                <IconButton>
                <ForumIcon/>
                </IconButton>
                <IconButton>
                <NotificationsActiveIcon/>
                </IconButton>
            */}
            {/* SignOut */}
             <IconButton onClick={()=> setLogoutPopup(!logoutPopup)}>
                <ExpandMoreIcon className={`header_arrow ${logoutPopup? 'active' : 'inactive'}`}/>
             </IconButton>
             </div>
             {logoutPopup && <div ref={signOutRef} > <DropDownSignOutPopup setLogoutPopup={setLogoutPopup}/> </div>}
        </div>
    )
}

export default Header;
