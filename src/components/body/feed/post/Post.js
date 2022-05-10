import React, {useRef, useEffect, useState, forwardRef} from 'react'
import './Post.css'
import {Avatar} from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import NearMeIcon from '@material-ui/icons/NearMe'
import {ExpandMoreOutlined} from '@material-ui/icons'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu';
import {useSelector} from 'react-redux';
import DropDownEditAndDeleteMenu from './dropdownmenu/DropDownEditAndDeleteMenu'
import db from '../../../../firebase/firebase'
import firebase from 'firebase/compat'
import MessageIcon from '@material-ui/icons/Message'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import WriteAComment from './writeacomment/WriteAComment'
import DisplayComments from './displaycomments/DisplayComments'
import PopupAttachment from '../../popupattachment/PopupAttachment'
import {getDownloadURL, uploadBytes} from 'firebase/storage'
import ErrorPopUp from '../../error/ErrorPopUp'

const Post = forwardRef(({id, profilePic, image, username, timestamp, message, favourite, userId},ref) =>{
  const user = useSelector((state) => (state.user))
  const [open, setOpen] = useState(false)
  const [popUp, setPopUp] = useState(false)
  const [input, setInput] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [fav, setFav] = useState(false)
  const dropDownRef = useRef(null)
  const popUpRef = useRef(null)
  const [writeComment, setWriteComment] = useState('')
  const [fileName, setFileName] = useState(null)
  const [displayComment, setDisplayComment] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const [fileType, setFileType] = useState(null)
  const [error, setError] = useState(false)
  const errorPopUpRef = useRef()
  const uploadRef = useRef()
    
  {/* add to favourites */}
  const addToFavourite = (e) => {
    e.preventDefault()
    setFav(!fav)
    
    db.collection('posts').doc(id).update({
      favourite: fav
    })
  }

  const resetState = () => {
    setInput('');
    setImageUrl(null);
    setFileName(null);
    setImagePreview(null);
    setFileType(null);
  }

  const handleFile = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setOpenPopup(!openPopup); 
    setImageUrl(e.target.files[0]); 
    setFileName(e.target.files[0].name); 
    setFileType(e.target.files[0].type);
    URL.revokeObjectURL(e.target.files[0]);
    e.target.value = null;
  }

  const deleteThis = (id) => {
    setPopUp(false)
    db.collection('posts').doc(id).delete().then(function() {
      console.log('document deleted');
    }).catch(function(error) {
      console.log('error could not delete this document', error)
    })}

    const editThis = () => {
      setPopUp(true)
    }

    {/* update the post with new message */}
    const handleSubmit = (e) => {
        e.preventDefault()
        setPopUp(false)
        const storageRef = firebase.storage();
        let store = storageRef.ref(`/posts/${fileName}`);

        if (imageUrl) { 
          if(fileType === 'image/gif'){
            uploadBytes(store, imageUrl).then(snapshot => {
              return getDownloadURL(snapshot.ref)
            }).then(downloadURL => {
              db.collection('posts').doc(id).update({
                message: input,
                timestamp: firebase.firestore.
                FieldValue.serverTimestamp(),
                profilePic: user.picture,
                username: user.name,
                image: downloadURL,
                favourite: fav,
                gif: true
              })
            })
          } else {
            uploadBytes(store, imageUrl).then(snapshot => {
              return getDownloadURL(snapshot.ref)
            }).then(downloadURL => {
              db.collection('posts').doc(id).update({
                message: input,
                timestamp: firebase.firestore.
                FieldValue.serverTimestamp(),
                profilePic: user.picture,
                username: user.name,
                image: downloadURL,
                favourite: fav,
                gif: false
              })})
            }
          } else {
            db.collection('posts').doc(id).update({
              message: input,
              timestamp: firebase.firestore.
              FieldValue.serverTimestamp(),
              profilePic: user.picture,
              username: user.name,
              favourite: fav,
              gif: false
            })
          }
          resetState(); 
        }
    
    
        {/* used for managing the edit and delete menu */}
        useEffect(()=> {

        const pageClickEvent = (e) => {
          if (dropDownRef.current !== null && !dropDownRef.current.contains(e.target)) {
            setOpen(!open);}
          };
       
          {/* If the item is active (ie open) then listen for clicks */}
          if (open) {
            window.addEventListener('click', pageClickEvent);
          }

          {/* cleans up when unmounted */}
          return () => {
            window.removeEventListener('click', pageClickEvent);
          }
        },[open])

        {/* used for managing the post updater */}
        useEffect(() => {

        const pageUpdater = (e) => {
          if (popUpRef.current !== null && !popUpRef.current.contains(e.target)){
            setPopUp(!popUp)
          }
        }

        {/* add window event listeners */}
        if (popUp) {
          window.addEventListener('click', pageUpdater)
        }
        
        {/* clean it up */}
        return () => {
          window.removeEventListener('click',pageUpdater)
        }
        },[popUp])

        useEffect(()=> {

        const detectOutside = e => {
          if (openPopup && uploadRef.current && !uploadRef.current.contains(e.target)) {
            setOpenPopup(false);
            setImageUrl(null);
            setFileName(null);
            setImagePreview(null);
            setFileType(null);
          }
        }
  
        window.addEventListener('click', detectOutside)
        return () => {
          window.removeEventListener('click', detectOutside )
        }
        }, [openPopup])

        useEffect(()=> {

        const popUpUpdated = e => {
          if (error && errorPopUpRef.current && !errorPopUpRef.current.contains(e.target)) {
            setError(false)
          }
        }

        window.addEventListener('click', popUpUpdated)
        return () => {
          window.removeEventListener('click', popUpUpdated)
        }
      }, [error])

     {/* render the post */}
      return (
        <div ref = {ref} className='post_container'>
          <div className='post_top'>
            <Avatar src={profilePic} className='post_avatar'/>
              <div className='post_info_top'>
                <h3>{username}</h3>
                <p>{new Date(timestamp?.toDate()).toUTCString()}</p>        
              </div>  
              {userId !== user.id ? '' : (<MenuIcon onClick={()=> setOpen(!open)} className='menu_icon'/>)}   
          </div>

          {/* render edit and delete menu */}
          <div ref = {dropDownRef} className='drop_down'>
            {open && <DropDownEditAndDeleteMenu postId={id} deleteThis={deleteThis} editThis={editThis}/>}
          </div>

          {/* render the post's bottom icon */}
          {message!== '' && <div className="post_bottom">
            <p>{message}</p>
          </div>
          } 
          <div className="post_image">
            <img src={image} />
          </div>
          <div className="post_options">

          {/* add post to favourites */ }
          <div onClick ={addToFavourite} className={`post_option ${favourite? 'active':'inactive'}`}>
            <ThumbUpIcon/>
            <p>Like</p>
          </div>

                { /* create a message */}    
                <div onClick = {() => setWriteComment(!writeComment)} className={`post_option ${writeComment? 'active':'inactive'}`}>
                    <ChatBubbleOutlineIcon />
                    <p>Comment</p>
                </div>
                <div className="post_option">
                    <NearMeIcon />
                    <p>Share</p>
                </div>
                <div onClick = {() => setDisplayComment(!displayComment) } className={`post_option ${displayComment? 'active' : 'inactive'}`}>
                    <AccountCircleIcon/>
                    <ExpandMoreOutlined className={`post_arrow ${displayComment? 'active' : 'inactive'}`}/>
                </div>

            </div>

            {/* render creating a message */}
            {writeComment && <WriteAComment  theId={id} setDisplayComment={setDisplayComment}/>}

            {/* render displaying the messages */}
            {displayComment && <DisplayComments theId = {id}/>}

            { /* render the popup used to update the post */}
            <div ref = {popUpRef} className='messsageContainer'>
              {popUp && <div className='messageSender_location'>
              <div className='messageSender__top'>
                <Avatar src={user.picture}/>
                <form>
                  <input 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder={`What's on your mind?, ${user.name}?`}
                    className="messageSender__input"
                  />
                  <label for="updateFile" className='upload_button'>
                    <div style={{marginTop:'7px'}}> Upload Image</div>    
                  </label> 
                  <input type="file" id="updateFile" accept="image/*" style={{display:"none"}} onChange={(e) => {  
                    if (e.target.files[0]) {
                      let fileTypeData = e.target.files[0].type;   
                        if (!fileTypeData.includes('image/')) {
                          setError(true)
                          setOpenPopup(false)
                        } else {
                            handleFile(e)
                        }
                    }  
                  }}
                  /> 
                    <button onClick={handleSubmit} type="submit" disabled={!input && !imageUrl}>
                    Hidden Submit
                    </button>
                  </form> 
              </div>
              <div className="messageSender__bottom">
                <div className="messageSender__option">
                  <MessageIcon style={{color: 'red'}}/>
                  <h3 className='messageSender__text'>Message</h3>
                </div>
                <div className="messageSender__option">
                  <PhotoLibraryIcon style={{color: 'green'}}/>
                  <h3 className='messageSender__text'>Image/Gif</h3>
                </div>
                <div className="messageSender__option">
                  <InsertEmoticonIcon style={{color: 'orange'}}/>
                  <h3 className='messageSender__text'>Feeling/Activity</h3>
                </div>
              </div>
            </div>
            }
          </div>
          {openPopup && <div ref = {uploadRef} >
            <PopupAttachment imagePreview={imagePreview} setImagePreview={setImagePreview} setOpenPopup={setOpenPopup} openPopup={openPopup} handleSubmit={handleSubmit} setImageUrl={setImageUrl} setFileName={setFileName} setFileType={setFileType}/>
          </div>
          }
          {error && <div ref = {errorPopUpRef} >
            <ErrorPopUp setError={setError}/>
          </div>
          }
        </div>
      )
})

export default Post
