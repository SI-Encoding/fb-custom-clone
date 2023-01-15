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
import ActivityTimer from './functions/ActivityTimer';

function App() {
  const user = useSelector((state) => state.user)
  const darkMode = useSelector((state) => state.darkMode)

useEffect(()=> {
  darkMode?  DarkMode() :  LightMode()
},[darkMode])

useEffect(()=> {
  if (user) {

  ActivityTimer.setupTimers(user);

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
