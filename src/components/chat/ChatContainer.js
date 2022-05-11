import React,{useState} from 'react'
import ChatBody from './chatbody/ChatBody'
import ChatHeader from './chatheader/ChatHeader'
import './ChatContainer.css'

function ChatContainer() {
  const [expand, setExpand] = useState(false);

  const expandMenu = () => {
    setExpand(!expand)
  }

  return (
    <div className='chat_toolbar_container'>
      <ChatHeader expand={expand} expandMenu={expandMenu}/>
      {expand && <ChatBody/>}
    </div>
  )
}

export default ChatContainer