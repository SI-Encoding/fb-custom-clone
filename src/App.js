import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import SideBar from './components/body/sidebar/SideBar';
import Feed from './components/body/feed/Feed';
import Widgets from './components/widgets/Widgets'
import Login from './components/login/Login'
import {useSelector} from 'react-redux'
import ChatContainer from './components/chat/ChatContainer'
import { Routes, Route } from "react-router-dom"
import MyPosts from './components/body/myposts/MyPosts';
import GifPosts from './components/body/gifposts/GifPosts';
import OtherUsersPosts from './components/body/otherusersposts/OtherUsersPosts';
import DarkMode from './functions/DarkMode' 
import LightMode from './functions/LightMode'
import ActivityTimer from './functions/ActivityTimer';
import CallPopup from './components/video/CallPopup';
import db from './firebase/firebase' 

function App() {
  const user = useSelector((state) => state.user)
  const darkMode = useSelector((state) => state.darkMode)
  const video = useSelector((state) => state.video)
  const [callModal, setCallModal] = useState(false)
  const [answerCall, setAnswerCall] = useState(false)
  const [callerId, setCallerId] = useState('')

  useEffect(() => {
    darkMode ? DarkMode() : LightMode();
  }, [darkMode]);

  useEffect(() => {
    if (user) {
      ActivityTimer.setupTimers(user);
    }
  }, [user]);

  useEffect(() => {
    if (video.status === true) {
      startVideoCall();
    }
  }, [video]);

  useEffect(() => {
    if (user) {
      const unsubscribe = requestCall()
    return () => {
      unsubscribe();
    }
    }
  }, [user]);

  function startVideoCall() {
    db.collection("request").doc(video.remoteId).set({
      request: true,
      user: user.id
    });
    setCallModal(true);
  }
  
  function requestCall() {
    db.collection("request")
        .doc(user.id)
        .onSnapshot((snapshot) => {
          if (snapshot.exists) {
            setCallModal(true);
            setAnswerCall(true);
            let data = snapshot._delegate._document.data.value.mapValue.fields.user.stringValue;
            setCallerId(data);
          } else {
            setCallModal(false);
          }
        });      
  }

return (
      <div class="app">       
        <Routes>
          <Route path="/" element={<><Header/><div className="app_container"><SideBar/>{callModal && <CallPopup remoteId={video.remoteId} setCallModal={setCallModal} setAnswerCall={setAnswerCall} answerCall={answerCall} callerId={callerId}/>}<Feed/><Widgets/><ChatContainer/></div></>}/>
          <Route path='/myposts' element={<><Header/><div className="app_container"><SideBar/>{callModal && <CallPopup remoteId={video.remoteId} setCallModal={setCallModal} setAnswerCall={setAnswerCall} answerCall={answerCall} callerId={callerId}/>}<MyPosts/><Widgets/><ChatContainer/></div></>}/>
          <Route path='/gifposts' element={<><Header/><div className="app_container"><SideBar/>{callModal && <CallPopup remoteId={video.remoteId} setCallModal={setCallModal} setAnswerCall={setAnswerCall} answerCall={answerCall} callerId={callerId}/>}<GifPosts/><Widgets/><ChatContainer/></div></>}/>
          <Route path='/otherusersposts' element={<><Header/><div className="app_container"><SideBar/>{callModal && <CallPopup remoteId={video.remoteId} setCallModal={setCallModal} setAnswerCall={setAnswerCall} answerCall={answerCall} callerId={callerId}/>}<OtherUsersPosts/><Widgets/><ChatContainer/></div></>}/>
          <Route path='/signin' element={<Login/>}/>
        </Routes>
      </div>
);
}

export default App;