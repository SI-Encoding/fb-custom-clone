import React, {useState, useRef, useEffect} from 'react' 
import './MessageSender.css'
import {Avatar} from '@material-ui/core'
import MessageIcon from '@material-ui/icons/Message'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import {useStateValue} from '../../../../StateProvider'
import db from '../../../../firebase/firebase'
import firebase from 'firebase/compat'
import {getDownloadURL, uploadBytes} from 'firebase/storage'
import {useSelector} from 'react-redux'
import PopupAttachment from '../../popupattachment/PopupAttachment'
import ErrorPopUp from '../../error/ErrorPopUp'
import {AddPostWithGifToFirebaseCollection} from '../../../../functions/Add'

function MessageSender() {
  const user = useSelector((state) => state.user)
  const [input, setInput] = useState("")    
  const [fav, setFav] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)    
  const [imageUrl, setImageUrl] = useState(null)    
  const [openPopup, setOpenPopup] = useState(false)    
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
  
  const handleFile = e => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));                
    setOpenPopup(!openPopup); 
    setImageUrl(e.target.files[0]); 
    setFileName(e.target.files[0].name); 
    setFileType(e.target.files[0].type);    
    URL.revokeObjectURL(e.target.files[0]);   
    e.target.value = null;
  }

  const handleSubmit = e => {    
    e.preventDefault();
    const storageRef = firebase.storage();    
    let store = storageRef.ref(`/posts/${fileName}`);        

    {/* Submit differently if file is uploaded */}
    if (imageUrl) {
      if(fileType === 'image/gif') {        
        uploadBytes(store, imageUrl).then(snapshot => {
          return getDownloadURL(snapshot.ref)
        }).then(downloadURL => {
          AddPostWithGifToFirebaseCollection(input,user.picture,user.name,downloadURL,fav,true,user.id)
        }
        )
      } else {            
          uploadBytes(store, imageUrl).then(snapshot => {            
            return getDownloadURL(snapshot.ref)            
          }).then(downloadURL => {            
              db.collection('posts').add({            
                message: input,            
                timestamp: firebase.firestore.            
                FieldValue.serverTimestamp(),    
                profilePic: user.picture,      
                username: user.name,        
                image: downloadURL,      
                favourite: fav,      
                gif: false,
                userId: user.id    
              })
          }
          )
      }              
    } else {              
        db.collection('posts').add({              
          message: input,              
          timestamp: firebase.firestore.              
          FieldValue.serverTimestamp(),              
          profilePic: user.picture,              
          username: user.name,              
          favourite: fav,
          gif: false,
          userId: user.id    
        })
      } 
      resetState();            
  } 

  useEffect( () => {            
    const detectOutside = e => {            
      if (openPopup && popupRef.current && !popupRef.current.contains(e.target)) {            
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
  },[openPopup])    

                
 return (               
  <div className = 'messageSender'>     
    <div className = 'messageSender__top'>        
      <Avatar src={user.picture}/>            
      <form>                
        <input            
          value = {input}                 
          onChange = {e => setInput(e.target.value)}                
          placeholder = {`What's on your mind?, ${user.name}?`}                
          className = "messageSender__input"/>                
        <label htmlFor = "imageFile" className = 'upload_button'>                
          <div style={{marginTop:'7px'}}> Upload Image</div>
        </label>           
        <input type="file" id="imageFile" accept="image/*" style={{display:"none"}} onChange={(e) => {                 
          if (e.target.files[0]) {                
            let fileTypeData = e.target.files[0].type;                
            if (!fileTypeData.includes('image/')) {             
              setError(true)
              e.target.value = null;
            } else {               
                handleFile(e)       
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

    {openPopup && <div ref = {popupRef}>                
      <PopupAttachment setFileType = {setFileType} 
        imagePreview = {imagePreview} 
        setImagePreview = {setImagePreview} 
        setOpenPopup = {setOpenPopup} 
        openPopup = {openPopup} 
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
