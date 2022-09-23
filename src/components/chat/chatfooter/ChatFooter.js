import React,{useState, useRef, useEffect} from 'react'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import AddIcon from '@material-ui/icons/Add';
import {handleFile} from '../../../functions/Upload'
import ChatEmojis from './chatemojis/ChatEmojis.js'
import ChatTextfield from './chattextfield/ChatTextfield.js'

function ChatFooter(
  {
    sendMessage, 
    input, 
    setInput, 
    setFile, 
    setPreviewFile, 
    setFileName, 
    setFileType, 
    previewFile, 
    autoSelect 
  }) {
  const [openEmoji, setOpenEmoji] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const emojiRef = useRef()
  const popupRef = useRef()
  const fileUploadRef = useRef()

  const handleKeyDown = (e) => {
    if(previewFile) {
      if (e.key === 'Enter') {
      sendMessage(e)
      }
    }  
  }

  const adjustSelect = () => {
    if (!input) {} else { setInput(input + ' ');}
          autoSelect();
  }

  useEffect( () => {
    const detectOutside = e => {
        if (openPopup && popupRef.current && !popupRef.current.contains(e.target)) {
          setOpenPopup(false)
        }
    }

    window.addEventListener('click', detectOutside)
    return () => {
      window.removeEventListener('click', detectOutside )
    }
  },[openPopup])

  useEffect( () => {
    const detectOutside = (e) => {
      if (openEmoji && emojiRef.current && !emojiRef.current.contains(e.target)) {
        setOpenEmoji(false)
      }
  }
       
  window.addEventListener('click', detectOutside)
  return () => {
    window.removeEventListener('click', detectOutside)
  }
  },[openEmoji])
  
  const emojisSet1 = [
    {
      icon: '😀',
      label: 'Happy Face'
    },
    {
      icon: '😃',
      label: 'Big eyes'
    },
    {
      icon: '😄',
      label: 'Grinning eyes'
    },
    {
      icon: '😁',
      label: 'Beaming face'
    },
  ]

  const emojisSet2 = [
    {
      icon: '😆',
      label: 'Grinning face'
    },
    {
      icon: '😅',
      label: 'Grinning Face with Sweat'
    },
    {
      icon: '🤣',
      label: 'Rolling on the Floor Laughing'
    },
    {
      icon: '😂',
      label: 'Face with Tears of Joy'
    }, 
  ]

  const emojisSet3 = [
    {
      icon: '🙂',
      label: 'Slightly Smiling Face'
    },
    {
      icon: '🙃',
      label: 'Upside-Down Face'
    },
    {
      icon: '😉',
      label: 'Winking Face'
    },
    {
      icon: '😊',
      label: 'Smiling Face with Smiling Eyes'
    },
  ]

  const emojisSet4 = [
    {
      icon: '😇',
      label: 'Smiling Face with Halo'
    },
    {
      icon: '🥰',
      label: 'Smiling Face with Hearts'
    },
    {
      icon: '😍',
      label: 'Smiling Face with Heart-Eyes'
    },
    {
      icon: '🤩',
      label: 'Star-Struck'
    },
  ]

  const emojis = [emojisSet1, emojisSet2, emojisSet3, emojisSet4]

  return (
    <div className='chat_footer'>
      <InsertEmoticonIcon onClick={() => setOpenEmoji(!openEmoji)} className='insert_icon'/>
      {/* Emoji container */}
      {openEmoji && 
      <div ref={emojiRef} className='emoji-container'>
        {emojis.map((emoji) => (
          <ChatEmojis 
          emojis={emoji} 
          setInput={setInput} 
          setOpenEmoji={setOpenEmoji} 
          openEmoji={openEmoji} 
          input={input} 
          autoSelect={autoSelect}
        />
        ))}
      </div>
      }
      {/* Submit message */}
      <ChatTextfield 
        handleKeyDown={handleKeyDown} 
        input={input}  
        setInput={setInput} 
        sendMessage={sendMessage}
      />
      
      {/* Attach File */}
      <label htmlFor="inputFile">
        <AddIcon className='addIcon' />
      </label>
      <input type="file" id="inputFile" ref={fileUploadRef} style={{display:"none"}} onChange={(e) => {
        if (e.target.files[0]) {
          handleFile(e, setPreviewFile, function(){}, undefined, setFile, setFileName, setFileType)
          adjustSelect()
        }
      }}
        />
    </div> 
  )
}

export default ChatFooter