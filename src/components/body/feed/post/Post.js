import React, {useState, forwardRef, useEffect, useRef} from 'react'
import './Post.css'
import {Avatar} from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import NearMeIcon from '@material-ui/icons/NearMe'
import {ExpandMoreOutlined} from '@material-ui/icons'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu';
import {useSelector} from 'react-redux';
import PostDropDownMenu from './dropdownmenu/PostDropDownMenu'
import db from '../../../../firebase/firebase'
import firebase from 'firebase/compat'
import WriteAComment from './writeacomment/WriteAComment'
import DisplayComments from './displaycomments/DisplayComments'
import PopupAttachment from '../../popupattachment/PopupAttachment'
import {getDownloadURL, uploadBytes} from 'firebase/storage'
import ErrorPopup from '../../error/ErrorPopUp'
import UpdatePost from './updatepost/UpdatePost'
import DeleteFromFirebaseCollection from '../../../../functions/Delete'
import UpdatePostFav, {UpdatePostWithGif, UpdatePostWithImage, UpdatePostWithNoAttachment} from '../../../../functions/Update'


const Post = forwardRef(({id, profilePic, image, username, timestamp, message, favourite, userId},ref) =>{
  const user = useSelector((state) => (state.user))
  
  // State to manage submitting posts
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [fav, setFav] = useState(false)

  // State to manage commenting on posts
  const [writeComment, setWriteComment] = useState('')
  const [displayComment, setDisplayComment] = useState(false)

  // State to manage popups
  const [updatePostPopUp, setUpdatePostPopUp] = useState(false)
  const [popUpAttachmentPopUp, setPopUpAttachmentPopUp] = useState(false)
  const [error, setError] = useState(false)

  // State to manage uploading files
  const [fileName, setFileName] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [fileType, setFileType] = useState(null)
  
  const storageRef = firebase.storage();
  let store = storageRef.ref(`/posts/${fileName}`);

  {/* add to favourites */}
  const addToFavourite = (e) => {
    e.preventDefault()
    setFav(!fav)
    UpdatePostFav('posts', id, fav)
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
    setPopUpAttachmentPopUp(!popUpAttachmentPopUp); 
    setImageUrl(e.target.files[0]); 
    setFileName(e.target.files[0].name); 
    setFileType(e.target.files[0].type);
    URL.revokeObjectURL(e.target.files[0]);
    e.target.value = null;
  }

  const deleteThis = (id) => {
    setUpdatePostPopUp(false)
    DeleteFromFirebaseCollection('posts',id)
  }
    const editThis = () => {
      setUpdatePostPopUp(true)
    }

    const postWithGif = () => {
      uploadBytes(store, imageUrl).then(snapshot => {
        return getDownloadURL(snapshot.ref)
      }).then(downloadURL => {
        UpdatePostWithGif('posts', id, input, user.picture, user.name, downloadURL, fav, true)
      })
    }
  
    const postWithImage = () => {
      uploadBytes(store, imageUrl).then(snapshot => {
        return getDownloadURL(snapshot.ref)
      }).then(downloadURL => {
          UpdatePostWithImage('posts', id, input, user.picture, user.name, downloadURL, fav, false)
        })
    }
  
    const postWithNoAttachment = () => {
      UpdatePostWithNoAttachment('posts', id, input, user.picture, user.name, fav, false)
    }

    {/* update the post with new message */}
    const handleSubmit = (e) => {
        e.preventDefault()
        setUpdatePostPopUp(false)
        
        if (imageUrl) { 
          if(fileType === 'image/gif'){
            postWithGif()
          } else {
            postWithImage()
            }
          } else {
            postWithNoAttachment()
          }
          resetState(); 
        }
   
     {/* render the post */}
      return (
        <div ref = {ref} className='post_container'>
          <div className='post_top'>
            <Avatar src={profilePic} className='post_avatar'/>
              <div className='post_info_top'>
                <h3>{username}</h3>
                <p>{new Date(timestamp?.toDate()).toUTCString()}</p>        
              </div>  
              {userId !== user.id ? '' : (<MenuIcon style={{color:'var(--fb-theme-colour-arrow)'}} onClick={()=> setOpen(!open)} className='menu_icon'/>)}   
          </div>

          {/* render edit and delete menu */}
          <div className='drop_down'>
            {open && <PostDropDownMenu open={open} setOpen={setOpen} postId={id} deleteThis={deleteThis} editThis={editThis}/>}
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

          {/* add post to favourites */}
          <div onClick ={addToFavourite} className={`post_option ${favourite? 'active':'inactive'}`}>
            <ThumbUpIcon/>
            <p>Like</p>
          </div>

          {/* create a message */}    
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

          {/* render the popup used to update the post */}
          {updatePostPopUp && 
            <UpdatePost 
              updatePostPopUp={updatePostPopUp} 
              setUpdatePostPopUp = {setUpdatePostPopUp} 
              input={input} 
              setInput={setInput} 
              handleFile={handleFile} 
              handleSubmit={handleSubmit} 
              setError={setError} 
              imageUrl={imageUrl}
            />
          }

          {/* render the popup used to upload preview of image */}
          {popUpAttachmentPopUp && 
            <PopupAttachment 
              imagePreview={imagePreview} 
              setImagePreview={setImagePreview} 
              setOpenPopup={setPopUpAttachmentPopUp} 
              openPopup={popUpAttachmentPopUp} 
              handleSubmit={handleSubmit} 
              setImageUrl={setImageUrl} 
              setFileName={setFileName} 
              setFileType={setFileType}
            />
          }

          {/* render the popup used to show wrong file type supported */}
          {error && 
            <ErrorPopup setError={setError} error={error} />
          }
        </div>
      )
})

export default Post
