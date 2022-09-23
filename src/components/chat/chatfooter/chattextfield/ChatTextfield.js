import React from 'react'

export default function ChatTextfield({handleKeyDown, input,  setInput, sendMessage}) {
  return (
    <form>
        <input id="textfield" onKeyDown={handleKeyDown} value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
        <button type="submit" onClick={sendMessage} disabled={!input}> Send a Message</button>
    </form>
  )
}
