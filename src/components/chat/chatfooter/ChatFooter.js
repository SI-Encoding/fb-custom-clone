import React,{useState, useRef, useEffect} from 'react'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import AddIcon from '@material-ui/icons/Add';

function ChatFooter({sendMessage, input, setInput, setFile, setPreviewFile, setFileName, setFileType, previewFile, autoSelect }) {
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

  const handleFile = (e) => {
    setPreviewFile(URL.createObjectURL(e.target.files[0])); 
    setFileName(e.target.files[0].name); 
    setFileType(e.target.files[0].type); 
    setFile(e.target.files[0]); 
    if (!input) {} else { setInput(input + ' ');}
    autoSelect();
    URL.revokeObjectURL(e.target.files[0]);
    e.target.value = null;
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
  
  return (
    <div className='chat_footer'>
      <InsertEmoticonIcon onClick={() => setOpenEmoji(!openEmoji)} className='insert_icon'/>
      {/* Emoji container */}
      {openEmoji && <div ref={emojiRef} className='emoji-container'>
      <div>
        <span className='emoji-icon' onClick={()=> {setInput(input +'😀'); setOpenEmoji(!openEmoji); autoSelect()}} role="img" aria-label="Happy Face">😀</span>  
        <span className='emoji-icon' onClick={()=> {setInput(input +'😃'); setOpenEmoji(!openEmoji); autoSelect()}}  role="img" aria-label="Big eyes">😃</span>   
        <span className='emoji-icon' onClick={()=> {setInput(input +'😄'); setOpenEmoji(!openEmoji); autoSelect()}}  role="img" aria-label="Grinning eyes">😄</span>   
        <span className='emoji-icon' onClick={()=> {setInput(input +'😁'); setOpenEmoji(!openEmoji); autoSelect()}}  role="img" aria-label="Beaming face">😁</span>  
      </div> 
      <div>
        <span className='emoji-icon' onClick={()=> {setInput(input +'😆'); setOpenEmoji(!openEmoji); autoSelect()}} role="img" aria-label="Grinning face">😆</span>   
        <span className='emoji-icon' onClick={()=> {setInput(input +'😅'); setOpenEmoji(!openEmoji); autoSelect()}} role="img" aria-label="Grinning Face with Sweat">😅</span>  
        <span className='emoji-icon' onClick={()=> {setInput(input +'🤣'); setOpenEmoji(!openEmoji); autoSelect()}} role="img" aria-label="Rolling on the Floor Laughing">🤣</span>  
        <span className='emoji-icon' onClick={()=> {setInput(input +'😂'); setOpenEmoji(!openEmoji); autoSelect()}} role="img" aria-label="Face with Tears of Joy">😂</span>  
      </div> 
      <div>
        <span className='emoji-icon' onClick={()=> {setInput(input +'🙂'); setOpenEmoji(!openEmoji); autoSelect()}} role="img" aria-label="Slightly Smiling Face">🙂</span>  
        <span className='emoji-icon' onClick={()=> {setInput(input +'🙃'); setOpenEmoji(!openEmoji); autoSelect()}} role="img" aria-label="Upside-Down Face">🙃</span>  
        <span className='emoji-icon' onClick={()=> {setInput(input +'😉'); setOpenEmoji(!openEmoji); autoSelect()}} role="img" aria-label="Winking Face">😉</span>  
        <span className='emoji-icon' onClick={()=> {setInput(input +'😊'); setOpenEmoji(!openEmoji); autoSelect()}} role="img" aria-label="Smiling Face with Smiling Eyes">😊</span>  
      </div> 
      <div>
        <span className='emoji-icon' onClick={()=> {setInput(input +'😇'); setOpenEmoji(!openEmoji); autoSelect()}} role="img" aria-label="Smiling Face with Halo">😇</span>  
        <span className='emoji-icon' onClick={()=> {setInput(input +'🥰'); setOpenEmoji(!openEmoji); autoSelect()}} role="img" aria-label="Smiling Face with Hearts">🥰</span>  
        <span className='emoji-icon' onClick={()=> {setInput(input +'😍'); setOpenEmoji(!openEmoji); autoSelect()}} role="img" aria-label="Smiling Face with Heart-Eyes">😍</span>  
        <span className='emoji-icon' onClick={()=> {setInput(input +'🤩'); setOpenEmoji(!openEmoji); autoSelect()}} role="img" aria-label="Star-Struck">🤩</span>  
      </div>      
      </div>
      }
      {/* Submit message */}
      <form>
        <input id="textfield" onKeyDown={handleKeyDown} value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
        <button type="submit" onClick={sendMessage} disabled={!input}> Send a Message</button>
      </form>
      {/* Attach File */}
      <label htmlFor="inputFile">
        <AddIcon className='addIcon' />
      </label>
      <input type="file" id="inputFile" ref={fileUploadRef} style={{display:"none"}} onChange={(e) => {
        if (e.target.files[0]) {
          handleFile(e)
        }
      }}
        />
    </div> 
  )
}

export default ChatFooter