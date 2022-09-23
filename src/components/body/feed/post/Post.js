import React, {useState, forwardRef} from 'react'
import './Post.css'
import {useSelector} from 'react-redux';
import PostDropDownMenu from './dropdownmenu/PostDropDownMenu'
import firebase from 'firebase/compat'
import WriteAComment from './writeacomment/WriteAComment'
import DisplayComments from './displaycomments/DisplayComments'
import PopupAttachment from '../../popupattachment/PopupAttachment'
import ErrorPopup from '../../error/ErrorPopUp'
import UpdatePost from './updatepost/UpdatePost'
import DeleteFromFirebaseCollection from '../../../../functions/Delete'
import UpdatePostFav, {UpdatePostWithNoAttachment} from '../../../../functions/Update'
import UploadPostsWithGif, {UploadPostsWithImage, handleFile} from '../../../../functions/Upload'
import PostImage from './postimage/PostImage'
import PostMessage from './postmessage/PostMessage'
import PostHeader from './postheader/PostHeader'
import PostOption from './postoption/PostOption'


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

  const deleteThis = (id) => {
    setUpdatePostPopUp(false)
    DeleteFromFirebaseCollection('posts',id)
  }
  
  const editThis = () => {
    setUpdatePostPopUp(true)
  }

  const postWithGif = () => {
    UploadPostsWithGif('update',fileName, imageUrl, 'posts', id, input, user.picture, user.name, fav, true, user.id)
  }

  const postWithImage = () => {
    UploadPostsWithImage('update',fileName, imageUrl, 'posts', id, input, user.picture, user.name, fav, true, user.id)
  }

  const postWithNoAttachment = () => {
    UpdatePostWithNoAttachment('posts', id, input, user.picture, user.name, fav, false, user.id)
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
        {/* render post header */}
        <PostHeader 
          profilePic={profilePic} 
          username={username} 
          timestamp={timestamp} 
          setOpen={setOpen} 
          open={open} 
          userId={userId} 
          user={user}
        />
        
        {/* render edit and delete menu */}
        <div className='drop_down'>
          {open && 
            <PostDropDownMenu 
              open={open} 
              setOpen={setOpen} 
              postId={id} 
              deleteThis={deleteThis} 
              editThis={editThis}
            />
          }
        </div>

        {/* render the post's message */}
        {message!== '' && 
          <PostMessage 
            message={message}
          />
        } 

        {/* render the post's image */}
        <PostImage image={image}/>

        {/* render the post's options */}
        <PostOption 
          addToFavourite={addToFavourite} 
          favourite={favourite} 
          setWriteComment={setWriteComment} 
          writeComment={writeComment} 
          setDisplayComment={setDisplayComment} 
          displayComment={displayComment}
        />
        

        {/* render creating a message */}
        {writeComment && 
          <WriteAComment  
            theId={id} 
            setDisplayComment={setDisplayComment}
          />
        }

        {/* render displaying the messages */}
        {displayComment && 
          <DisplayComments 
            theId = {id}
          />
        }

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
            setImagePreview={setImagePreview}
            setPopUpAttachmentPopUp={setPopUpAttachmentPopUp}
            setImageUrl={setImageUrl}
            setFileName={setFileName}
            setFileType={setFileType}
            popUpAttachmentPopUp={popUpAttachmentPopUp}
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
          <ErrorPopup 
            setError={setError} 
            error={error} 
          />
        }
      </div>
    )
})

export default Post
