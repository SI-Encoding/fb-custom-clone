import React, {useState} from 'react'
import ChatBody from './chatbody/ChatBody'
import ChatHeader from './chatheader/ChatHeader'
import './ChatContainer.css'
import ChatList from './chatlist/ChatList'
import { useSelector } from 'react-redux'

function ChatContainer() {
  const [expand, setExpand] = useState(false);
  const chatUserInfo = useSelector(state => state.chatUserInfo)

  const expandMenu = () => {
    setExpand(!expand)
  }

  return (
    <div className='chat_toolbar_container'>
      <ChatHeader expand={expand} expandMenu={expandMenu} chatUserInfo={chatUserInfo}/>
      {expand && chatUserInfo !== null && <ChatBody chatUserInfo={chatUserInfo}/>}
      {expand && chatUserInfo === null && <ChatList/>}
    </div>
  )
}

export default ChatContainer