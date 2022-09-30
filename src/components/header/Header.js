import React, {useState, useRef, useEffect} from 'react'
import './Header.css';
import {useSelector, useDispatch} from 'react-redux'
import HeaderLeft from './headerleft/HeaderLeft';
import HeaderCenter from './headercenter/HeaderCenter';
import HeaderRight from './headerright/HeaderRight';

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
    const notificationsRef = useRef()
    const [notificationMenu, setNotificationMenu] = useState(false)

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

        const notificationMenuUpdate = e => {
            if (notificationMenu && notificationsRef.current && !notificationsRef.current.contains(e.target)){
                setNotificationMenu(!notificationMenu)
            }
        }

        window.addEventListener('click', pageUpdater)
        window.addEventListener('click', notificationMenuUpdate)
        return ()=> {
            window.removeEventListener('click', pageUpdater)
            window.removeEventListener('click', notificationMenuUpdate)
        }
    },[logoutPopup])

    return (
        <div className = "header"> 
            <HeaderLeft/>
            <HeaderCenter 
                homePage = {homePage} 
                homePageActivated = {homePageActivated} 
                gifsPage = {gifsPage} 
                gifsPageActivated = {gifsPageActivated} 
                myPostsPage = {myPostsPage}
                myPostsPageActivated = {myPostsPageActivated} 
                otherUsersPostsPage = {otherUsersPostsPage} 
                otherUsersPostsPageActivated = {otherUsersPostsPageActivated}
            />
             <div className='header_divider'></div>
            <HeaderRight 
                user= {user} 
                setLogoutPopup= {setLogoutPopup} 
                logoutPopup= {logoutPopup} 
                notificationMenu= {notificationMenu}
                setNotificationMenu= {setNotificationMenu}
                signOutRef= {signOutRef}
                notificationsRef= {notificationsRef}
            />
        </div>
    )
}

export default Header;
