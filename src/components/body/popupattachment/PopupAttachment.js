import React from 'react'
import './PopupAttachment.css'
import {Button} from '@material-ui/core'

function PopupAttachment({setOpenPopup, openPopup, imagePreview, handleSubmit, setFileName, setImageUrl, setImagePreview, setFileType}) {
  return (
    <div className='popup_container'>
      <div className='popup_top'>
        <h3 className='popup_title'>Upload File</h3>
      </div>
      <div className='popup_preview'>
      <img src={imagePreview} alt= 'your_uploaded_image'/>
      </div>
      <div className='popup_buttons'>
        <Button type ='submit' onClick={()=> {
          setOpenPopup(!openPopup); 
          setFileName(null); 
          setImageUrl(null); 
          setImagePreview(null); 
          setFileType(null);
          }}
          >Cancel</Button>
      <div className='popup_divide_buttons'></div>
        <Button type ='submit' onClick={(e)=> {setOpenPopup(!openPopup); handleSubmit(e) }}>Submit</Button>
      </div>
    </div>
  )
}

export default PopupAttachment