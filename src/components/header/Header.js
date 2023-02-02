import React, {useState, useRef, useEffect} from 'react'
import './Header.css';
import {useSelector} from 'react-redux'
import HeaderLeft from './headerleft/HeaderLeft';
import HeaderCenter from './headercenter/HeaderCenter';
import HeaderRight from './headerright/HeaderRight';

function Header() {
    const user = useSelector((state) => state.user)
    const [homePage, setHomePage] = useState(true)
    const [myPostsPage, setMyPostsPage] = useState(false)
    const [gifsPage, setGifsPage] = useState(false)
    const [otherUsersPostsPage, setOtherUsersPostsPage] = useState(false)
    const [logoutPopup, setLogoutPopup] = useState(false)
    const signOutRef = useRef()
    const notificationsRef = useRef()
    const sharedPostRef = useRef()
    const [notificationMenu, setNotificationMenu] = useState(false)
    const [sharedPostMenu, setSharedPostMenu] = useState(false)
  
    const homePageActivated = () => {
        setHomePage(true)
        setMyPostsPage(false)
        setGifsPage(false)
        setOtherUsersPostsPage(false)
    }

    const myPostsPageActivated = () => {   
        setMyPostsPage(true)   
        setHomePage(false)
        setGifsPage(false)
        setOtherUsersPostsPage(false)
    }

    const gifsPageActivated = () => { 
        setGifsPage(true)
        setHomePage(false)
        setMyPostsPage(false)
        setOtherUsersPostsPage(false)
    }

    const otherUsersPostsPageActivated = () => {
        setOtherUsersPostsPage(true)
        setHomePage(false)
        setMyPostsPage(false)
        setGifsPage(false)
    }

    useEffect(() => {
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

    useEffect(() => {
        const notificationMenuUpdate = e => {
            if (notificationMenu && notificationsRef.current && !notificationsRef.current.contains(e.target)){
                setNotificationMenu(!notificationMenu)
            }
        }

        window.addEventListener('click', notificationMenuUpdate)
        return ()=> {
            window.removeEventListener('click', notificationMenuUpdate)

        }
    },[notificationMenu])

    useEffect(() => {
        const sharedPostMenuUpdate = e => {
            if (sharedPostRef && sharedPostRef.current && !sharedPostRef.current.contains(e.target)){
                setSharedPostMenu(!sharedPostMenu)
            }
        }

        window.addEventListener('click', sharedPostMenuUpdate)
        return ()=> {
            window.removeEventListener('click', sharedPostMenuUpdate)
        }
    },[sharedPostMenu])

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
            <HeaderRight 
                user= {user} 
                setLogoutPopup= {setLogoutPopup} 
                logoutPopup= {logoutPopup} 
                notificationMenu= {notificationMenu}
                setNotificationMenu= {setNotificationMenu}
                sharedPostMenu = {sharedPostMenu} 
                setSharedPostMenu = {setSharedPostMenu}
                signOutRef= {signOutRef}
                notificationsRef= {notificationsRef}
                sharedPostRef = {sharedPostRef}
            />
        </div>
    )
}

export default Header;
