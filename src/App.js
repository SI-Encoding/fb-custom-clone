import './App.css';
import { useEffect } from 'react';
import Header from './components/header/Header';
import SideBar from './components/body/sidebar/SideBar';
import Feed from './components/body/feed/Feed';
import Widgets from './components/widgets/Widgets'
import Login from './components/login/Login'
import {useSelector} from 'react-redux'
import ChatContainer from './components/chat/ChatContainer'
import { Routes, Route } from "react-router-dom"
import Favourites from './components/body/favourites/Favourites'
import MyPosts from './components/body/myposts/MyPosts';
import GifPosts from './components/body/gifposts/GifPosts';
import OtherUsersPosts from './components/body/otherusersposts/OtherUsersPosts';
import DarkMode from './functions/DarkMode' 
import LightMode from './functions/LightMode'
import db from './firebase/firebase'

function App() {
  const user = useSelector((state) => state.user)
  const darkMode = useSelector((state) => state.darkMode)

useEffect(()=> {
  darkMode?  DarkMode() :  LightMode()
},[darkMode])

useEffect(()=> {
  let timeoutInMiliseconds = 60000;
  let timeoutId; 

  if (user) {
  const resetTimer = () => { 
    window.clearTimeout(timeoutId)
    startTimer();
  }
    
  const startTimer = () => { 
      db.collection('users').doc(user.id).set({
        online: true
    }, { merge: true });
      timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)
  }
    
  const doInactive = () => {
      db.collection('users').doc(user.id).set({
        online: false
    }, { merge: true });
  }
   
  const setupTimers = () => {
      document.addEventListener("mousemove", resetTimer, false);
      document.addEventListener("mousedown", resetTimer, false);
      document.addEventListener("keypress", resetTimer, false);
      document.addEventListener("touchmove", resetTimer, false);
      window.addEventListener('beforeunload', (e) => {
        e.preventDefault();
        db.collection('users').doc(user.id).set({
          online: false
        }, { merge: true });
      return null
    });
      startTimer();
  }
  setupTimers()
  } 
}, [user])

return (
      <>       
        <Routes>
          <Route path="/" element={ <><Header/><div className={"app_container"}><SideBar/><Feed/><Widgets/><ChatContainer/></div></>}/>
          <Route path='/favourites' element={ <><Header/><div className="app_container"><SideBar/><Favourites/><Widgets/><ChatContainer/></div></>}/>
          <Route path='/myposts' element={ <><Header/><div className="app_container"><SideBar/><MyPosts/><Widgets/><ChatContainer/></div></>}/>
          <Route path='/gifposts' element={ <><Header/><div className="app_container"><SideBar/><GifPosts/><Widgets/><ChatContainer/></div></>}/>
          <Route path='/otherusersposts' element={ <><Header/><div className="app_container"><SideBar/><OtherUsersPosts/><Widgets/><ChatContainer/></div></>}/>
          <Route path='/signin' element={<Login/>} />
        </Routes>
      </>
);
}

export default App;