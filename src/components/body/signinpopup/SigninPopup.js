import React,{useEffect, useRef} from 'react'
import {Button} from '@material-ui/core'
import '../error/ErrorPopUp.css'
import WarningIcon from '@mui/icons-material/Warning';
import { useNavigate } from 'react-router-dom';

function SigninPopup({setMustSignin, mustSignin}) {
  const signinPopUpRef = useRef(null)
  const navigate = useNavigate();

  useEffect(()=> {

    const popUpUpdated = e => {
      if (signinPopUpRef.current && !signinPopUpRef.current.contains(e.target)) {
        setMustSignin(!mustSignin)
      }
    }

    window.addEventListener('click', popUpUpdated)
    return () => {
      window.removeEventListener('click', popUpUpdated)
    }
  }, [mustSignin])

  return (
    <div ref ={signinPopUpRef} className='popup_error_container'>
      <div className='popup_error_top'>
        <h3 className='popup_error_title'>Error</h3>
      </div>
      <div className='popup_error_preview'>
        <div className='popup_error'> 
          <WarningIcon sx={{ color: '#f30000', fontSize: '84px' }}/>
        </div> 
        <div> 
          <h4 style={{textAlign:'center', color:'var(--fb-theme-colour-text)'}}>Sorry, you must be logged in to use these features. <br/> 
          </h4>
        </div>
      </div>
        <div className='popup_error_buttons'>
          <Button type ='submit' onClick={()=> {setMustSignin(!mustSignin); navigate('signin')}}>Signin</Button>
        </div>
    </div>
  )
}

export default SigninPopup