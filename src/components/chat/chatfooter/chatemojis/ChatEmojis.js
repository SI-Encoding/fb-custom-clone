import React from 'react'

export default function ChatEmojis({emojis, setInput, setOpenEmoji, openEmoji, input, autoSelect}) {
  return (
    <div>
        {emojis.map((emoji) => (
          <span 
            className='emoji-icon' 
            onClick={()=> {setInput(input +emoji.icon); setOpenEmoji(!openEmoji); autoSelect()}} 
            role="img" 
            aria-label={emoji.label}
            >
              {emoji.icon}
          </span>    
        ))}
      </div> 
  )
}
