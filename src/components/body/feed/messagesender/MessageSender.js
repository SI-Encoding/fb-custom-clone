import React, {useState, useRef, useEffect} from 'react' 
import './MessageSender.css'
import {Avatar} from '@material-ui/core'
import MessageIcon from '@material-ui/icons/Message'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import {useSelector} from 'react-redux'
import PopupAttachment from '../../popupattachment/PopupAttachment'
import ErrorPopUp from '../../error/ErrorPopUp'
import {addPostWithoutImageToFirebaseCollection} from '../../../../functions/Add'
import uploadPostsWithGif, {uploadPostsWithImage, handleFile} from '../../../../functions/Upload'
import {useNavigate} from 'react-router-dom'

function MessageSender() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate();
  const [input, setInput] = useState("")    
  const [fav, setFav] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)    
  const [imageUrl, setImageUrl] = useState(null)    
  const [popUp, setPopup] = useState(false)    
  const [fileName, setFileName] = useState(null)    
  const [fileType, setFileType] = useState(null)    
  const [error, setError] = useState(false)    
  const popupRef = useRef()    
  const errorPopUpRef = useRef()   

  const resetState = () => {
    setInput('');  
    setImageUrl(null);
    setFileName(null);
    setImagePreview(null);            
    setFileType(null);
  }
  
  const handleSubmit = e => {    
    e.preventDefault();
     
    {/* Submit differently if file is uploaded */}
    if (user) {
      if (imageUrl) {
        if(fileType === 'image/gif') {        
          uploadPostsWithGif('add', fileName, imageUrl, 'posts', null, input, user.picture, user.name, fav, true, user.id)
        } else {            
          uploadPostsWithImage('add', fileName, imageUrl, 'posts', null, input, user.picture, user.name, fav, false, user.id)
        }              
      } else {              
          addPostWithoutImageToFirebaseCollection(input, user.picture, user.name, fav, false, user.id)
        } 
        resetState();
    } else {
      navigate('signin')
    
    
    }            
  } 

  useEffect( () => {            
    const detectOutside = e => {            
      if (popUp && popupRef.current && !popupRef.current.contains(e.target)) {            
        setPopup(false);            
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
  },[popUp])    
          
 return (               
  <div className = 'messageSender'>     
    <div className = 'messageSender__top'>        
      { user ? <Avatar src={user.picture}/> : <Avatar/>}
      <form>                
        <input            
          value = {input}                 
          onChange = {e => setInput(e.target.value)}                
          placeholder = {`What's on your mind? ${user ? user.name : ''}`}                
          className = "messageSender__input"/>                
        <label htmlFor = "imageFile" className = 'upload_button'>                
          <div style={{marginTop:'7px'}} onClick={() => !user && navigate('signin')}>{user ? "Upload Image" : "signin"}</div>
        </label>           
        <input type="file" id="imageFile" accept="image/*" style={{display:"none"}} disabled={!user} onChange={(e) => {                 
          if (e.target.files[0]) {                
            let fileTypeData = e.target.files[0].type;                
            if (!fileTypeData.includes('image/')) {             
              setError(true)
              e.target.value = null;
            } else {               
                handleFile(e, setImagePreview, setPopup, popUp, setImageUrl, setFileName, setFileType)       
            }
          } 
        }
        }/>                
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

    {popUp && <div ref = {popupRef}>                
      <PopupAttachment setFileType = {setFileType} 
        imagePreview = {imagePreview} 
        setImagePreview = {setImagePreview} 
        setOpenPopup = {setPopup} 
        openPopup = {popUp} 
        handleSubmit = {handleSubmit} 
        setImageUrl = {setImageUrl} 
        setFileName = {setFileName}/>                
    </div>
    }     

    {error &&               
      <ErrorPopUp setError={setError} error={error}/>            
    }            
</div>   
)       
}           
                          
export default MessageSender
