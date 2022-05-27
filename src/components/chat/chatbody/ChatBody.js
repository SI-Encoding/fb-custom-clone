import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import './ChatBody.css'
import db from '../../../firebase/firebase'
import firebase from 'firebase/compat'
import CancelIcon from '@mui/icons-material/Cancel';
import ChatMessage from './chatmessage/ChatMessage'
import ChatFooter from '../chatfooter/ChatFooter'
import {uploadBytes, getDownloadURL} from 'firebase/storage'
import DeleteFromFirebaseCollection from '../../../functions/Delete'

function ChatBody() {
  const user = useSelector((state) => (state.user))
  const [input, setInput] = useState('')
  const [chat, setChat] = useState([])
  const messageRef = useRef();
  const [previewFile, setPreviewFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [fileType, setFileType] = useState(null)
  const [file, setFile] = useState(null)

  const storageRef = firebase.storage();
  
  let store = storageRef.ref(`/files/${fileName}`);

  const autoSelect = () => {
    let inputSelector = document.getElementById('textfield')
    inputSelector.select()
  }

  const resetState = () => {
    setInput('')
    setPreviewFile(null)
    setFileName(null)
    setFileType(null)
    setFile(null)
  }

  const deleteComment = (id) => {
    DeleteFromFirebaseCollection('chat', id)
  }

  const sendMessageWithImage = () => {
    uploadBytes(store, file).then(snapshot => {
      return getDownloadURL(snapshot.ref)
      }).then(downloadURL => {
        db.collection('chat').add({
          message: input,
          username: user.name,
          time: firebase.firestore.FieldValue.serverTimestamp(),
          img: downloadURL,
          userId: user.id
        })
      })
  }

  const sendMessageWithOtherFiles = () => {
    uploadBytes(store, file).then(snapshot => {
      return getDownloadURL(snapshot.ref)
      }).then(downloadURL => {
        db.collection('chat').add({
          message: input,
          username: user.name,
          time: firebase.firestore.FieldValue.serverTimestamp(),
          url: downloadURL,
          fileName: fileName,
          userId: user.id
        })
      })
  }

  const sendMessageWithNoFiles = () => {
    db.collection('chat').add({
      message: input,
      username: user.name,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      userId: user.id
    })
  }
 
  useEffect(() => {
    db.collection('chat').orderBy('time','asc').onSnapshot((snapshot) => {
      setChat(snapshot.docs.map((doc) => ({id:doc.id, data:doc.data()}))) 
        if (messageRef.current) {
          messageRef.current.scrollTop = messageRef.current.scrollHeight;  
        }
    })   
    autoSelect()       
  },[])

  const sendMessage = (e) => {
    e.preventDefault()
    if (previewFile) {
      if (fileType.includes('image')) {
        sendMessageWithImage()
      } else {
        sendMessageWithOtherFiles()
        }
    } else {
        sendMessageWithNoFiles()
      }
      resetState();
  }
 
  return (
    <>
      <div ref={messageRef} id='chat_body' className='chat_body'>
        {chat.map(c => ( 
          <ChatMessage key = {c.id} userId = {c.data.userId} id = {c.id} username = {c.data.username} message = {c.data.message} time = {c.data.time} img = {c.data.img} fileName = {c.data.fileName} url = {c.data.url} deleteComment = {deleteComment}/>
        ))}
        {previewFile && <div id='preview' className='preview_container'> 
          <div className='preview_delete' onClick={()=> {setPreviewFile(null); autoSelect();}}> <CancelIcon/> </div>
          {fileType.includes('image') ?<img src={previewFile} className='preview_image'/>: <a href={fileName}>{fileName}</a> }
        </div>
        }        
        </div> 
      <ChatFooter autoSelect={autoSelect} previewFile={previewFile} sendMessage={sendMessage} input={input} setInput={setInput} setFile={setFile} setPreviewFile={setPreviewFile} setFileName={setFileName} setFileType={setFileType}/>
    </>
  )
}

export default ChatBody
 