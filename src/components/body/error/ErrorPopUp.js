import React from 'react'
import {Button} from '@material-ui/core'
import './ErrorPopUp.css'
import WarningIcon from '@mui/icons-material/Warning';

function ErrorPopUp({setError}) {
  return (
    <div className='popup'>
      <div className='popup_top'>
        <h3 className='popup_title'>Error</h3>
      </div>
      <div className='popup_preview'>
        <div className='popup_error'> 
          <WarningIcon sx={{ color: '#f30000', fontSize: '84px' }}/>
        </div> 
        <div> 
          <h4 style={{textAlign:'center'}}>Sorry, this is not the supported file type. <br/> 
          <div style={{textAlign:'center'}}>Please upload a image file. </div></h4></div>
        </div>
        <div className='popup_buttons'>
          <Button type ='submit' onClick={(e)=> { setError(false)}}>Ok</Button>
        </div>
    </div>
  )
}

export default ErrorPopUp