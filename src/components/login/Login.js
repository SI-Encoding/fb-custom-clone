import React from 'react'
import './Login.css'
import {Button} from '@material-ui/core'
import {provider, auth} from '../../firebase/firebase'
//import {actionTypes} from './Reducer'
import {useStateValue} from '../../StateProvider'
import {set_user} from '../../rootReducer'
import {useSelector, useDispatch} from 'react-redux'
import fb from './img/fb.jpg'

function Login() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch(); 
    //type: actionTypes.SET_USER,
    //const [state, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider).then((result => {
            dispatch({
                type: set_user,
                user: result.additionalUserInfo.profile,       
            })
    })).catch(error => alert(error.message));
    }
    
return (
    <div className='login_container'>
        <div className='login_logo'>
            <img src='https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png' alt='fb_logo'/>
            <img src={fb} alt='fb_title'/>
            <div className='login_divider'></div>
            <div className='login_button'> 
                <Button type ='submit' onClick={signIn}>Signin</Button>
            </div>     
        </div>        
    </div>
)
}

export default Login
