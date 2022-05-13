import React,{useEffect, useRef} from 'react'
import {Button} from '@material-ui/core'
import './ErrorPopUp.css'
import WarningIcon from '@mui/icons-material/Warning';

function ErrorPopUp({setErrorPopUp,errorPopUp}) {
  const errorPopUpRef = useRef()

  useEffect(()=> {

    const popUpUpdated = e => {
      if (errorPopUp && errorPopUpRef.current && !errorPopUpRef.current.contains(e.target)) {
        setErrorPopUp(false)
      }
    }

    window.addEventListener('click', popUpUpdated)
    return () => {
      window.removeEventListener('click', popUpUpdated)
    }
  }, [errorPopUp])

  return (
    <div ref = {errorPopUpRef} className='popup_error_container'>
      <div className='popup_error_top'>
        <h3 className='popup_error_title'>Error</h3>
      </div>
      <div className='popup_error_preview'>
        <div className='popup_error'> 
          <WarningIcon sx={{ color: '#f30000', fontSize: '84px' }}/>
        </div> 
        <div> 
          <h4 style={{textAlign:'center', color:'var(--fb-theme-colour-text)'}}>Sorry, this is not the supported file type. <br/> 
          <div style={{textAlign:'center'}}>Please upload a image file. </div></h4></div>
        </div>
        <div className='popup_error_buttons'>
          <Button type ='submit' onClick={(e)=> { setErrorPopUp(false)}}>Ok</Button>
        </div>
    </div>
  )
}

export default ErrorPopUp