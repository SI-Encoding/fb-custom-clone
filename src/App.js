
import './App.css';
import Header from './components/header/Header';
import SideBar from './components/body/sidebar/SideBar';
import Feed from './components/body/feed/Feed';
import Widgets from './components/widgets/Widgets'
import Login from './components/login/Login'
import {useStateValue} from'./StateProvider'
import {useSelector} from 'react-redux'
import ChatContainer from './components/chat/ChatContainer'
import { Routes, Route } from "react-router-dom"
import Favourites from './components/body/favourites/Favourites'
import MyPosts from './components/body/myposts/MyPosts';
import GifPosts from './components/body/gifposts/GifPosts';
import OtherUsersPosts from './components/body/otherusersposts/OtherUsersPosts';

function App() {
  const user = useSelector((state) => state.user)

return (
  <div className={`app ${user? 'active':'inactive'}`}>
    {!user ? <Login/> : (
      <>
      <Header /> 
      <div className="app_container">
      <SideBar />       
      <Routes>
        <Route path="/" element={ <Feed/> } />
        <Route path='favourites' element={ <Favourites/>} />
        <Route path='myposts' element={ <MyPosts/>} />
        <Route path='gifposts' element={ <GifPosts/>} />
        <Route path='otherusersposts' element={ <OtherUsersPosts/>} />
      </Routes>
      <Widgets/>
      <ChatContainer/>
      </div>
      </>
    )}
  </div>
);
}

export default App;
