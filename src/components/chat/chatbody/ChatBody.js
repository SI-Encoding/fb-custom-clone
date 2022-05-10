import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import './ChatBody.css'
import db from '../../../firebase/firebase'
import firebase from 'firebase/compat'
import CancelIcon from '@mui/icons-material/Cancel';
import ChatMessage from './chatmessage/ChatMessage'
import ChatFooter from '../chatfooter/ChatFooter'
import {uploadBytes, getDownloadURL} from 'firebase/storage'

function ChatBody() {
  const user = useSelector((state) => (state.user))
  const [input, setInput] = useState('')
  const [chat, setChat] = useState([])
  const messageRef = useRef(null);
  const [previewFile, setPreviewFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [fileType, setFileType] = useState(null)
  const [file, setFile] = useState(null)

  const deleteComment = (id) => {
    db.collection('chat').doc(id).delete().then(function() {
      console.log('comment successfully deleted ')
    }).catch(function(error) {
      console.log('error failed to delete comment')
    })
  }
 
  useEffect( () => {
    if (messageRef) {
      messageRef.current.addEventListener('DOMNodeInserted', event => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  },[])

  const storageRef = firebase.storage();

  const sendMessage = (e) => {
    e.preventDefault()
    if (previewFile) {
      let store = storageRef.ref(`/files/${fileName}`);

      if (fileType.includes('image')) {
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
      } else {
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
    } else {
        db.collection('chat').add({
          message: input,
          username: user.name,
          time: firebase.firestore.FieldValue.serverTimestamp(),
          userId: user.id
        })
      }
      setInput('')
      setPreviewFile(null)
      setFileName(null)
      setFileType(null)
      setFile(null)
  }
 
  useEffect( () => {
    db.collection('chat').orderBy('time','asc').onSnapshot((snapshot) => {
      setChat(snapshot.docs.map((doc) => ({id:doc.id, data:doc.data()}))) 
    })
    let inputSelector = document.getElementById('textfield');
    inputSelector.select()
  },[])

  return (
    <>
      <div ref={messageRef} id='chat_body' className='chat_body'>
        {chat.map(c => (
          <ChatMessage key = {c.id} userId = {c.data.userId} id = {c.id} username = {c.data.username} message = {c.data.message} time = {c.data.time} img = {c.data.img} fileName = {c.data.fileName} url = {c.data.url} deleteComment = {deleteComment}/>
        ))}
        {previewFile && <div ref={messageRef} id='preview' className='preview_container'> 
          <div className='preview_delete' onClick={()=> setPreviewFile(null)}> <CancelIcon/> </div>
          {fileType.includes('image') ?<img src={previewFile} className='preview_image'/>: <a href={fileName}>{fileName}</a> }
        </div>
        }        
        </div> 
      <ChatFooter previewFile={previewFile} sendMessage={sendMessage} input={input} setInput={setInput} setFile={setFile} setPreviewFile={setPreviewFile} setFileName={setFileName} setFileType={setFileType}/>
    </>
  )
}

export default ChatBody
 