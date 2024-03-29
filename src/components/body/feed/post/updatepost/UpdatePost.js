import React,{useEffect, useRef} from 'react';
import { Avatar } from '@material-ui/core';
import {useSelector} from 'react-redux';
import MessageIcon from '@material-ui/icons/Message';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

function UpdatePost(
  {
    updatePostPopUp, 
    setUpdatePostPopUp, 
    input, 
    setInput, 
    handleFile, 
    handleSubmit, 
    setError, 
    imageUrl, 
    setImagePreview, 
    setPopUp, 
    setImageUrl, 
    setFileName, 
    setFileType, 
    popUp
  }) {
    const user = useSelector((state) => (state.user))
    const popUpRef = useRef(null)

    {/* used for managing the post updater */}
    useEffect(() => {

      const pageUpdater = (e) => {
        if (popUpRef.current && !popUpRef.current.contains(e.target)){
          setUpdatePostPopUp(!updatePostPopUp)
        }
      }

      {/* add window event listeners */}
      window.addEventListener('click', pageUpdater)
     
      {/* clean it up */}
      return () => {
        window.removeEventListener('click',pageUpdater)
      }
    },[updatePostPopUp])

    return (
      <div ref = {popUpRef} className='messsageContainer'>
        <div className='messageSender_location'>
          <div className='messageSender__top'>
            <Avatar src={user.picture}/>
            <form>
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={`What's on your mind?, ${user.name}?`}
                className="messageSender__input"
              />
              <label htmlFor="updateFile" className='upload_button'>
                <div style={{marginTop:'7px'}}> Upload Image</div>    
              </label> 
              <input type="file" id="updateFile" accept="image/*" style={{display:"none"}} onChange={(e) => {  
                if (e.target.files[0]) {
                  let fileTypeData = e.target.files[0].type;   
                    if (!fileTypeData.includes('image/')) {
                      setError(true)
                    } else {
                      handleFile(e, setImagePreview, setPopUp, popUp, setImageUrl, setFileName, setFileType)
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
      </div>
  )
}

export default UpdatePost