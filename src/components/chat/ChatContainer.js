import React, {useState} from 'react'
import ChatBody from './chatbody/ChatBody'
import ChatHeader from './chatheader/ChatHeader'
import './ChatContainer.css'
import ChatList from './chatlist/ChatList'
import { useSelector } from 'react-redux'
import ChatHeaderInfo from './chatheader/ChatHeaderInfo'

function ChatContainer() {
  const [expand, setExpand] = useState(false);
  const chatUserInfo = useSelector(state => state.chatUserInfo)
  const user = useSelector(state => state.user);
  const expandMenu = () => {
    setExpand(!expand)
  }

  return (
  <>
   {user && 
    <div className='chat_toolbar_container'>
        <ChatHeader expand={expand} expandMenu={expandMenu} chatUserInfo={chatUserInfo}/>
        {expand && chatUserInfo !== null && <ChatHeaderInfo chatUserInfo={chatUserInfo}/>}
        {expand && chatUserInfo !== null && <ChatBody chatUserInfo={chatUserInfo}/>}
        {expand && chatUserInfo === null && <ChatList/>}
    </div>
  } 
  </>
  )
}

export default ChatContainer