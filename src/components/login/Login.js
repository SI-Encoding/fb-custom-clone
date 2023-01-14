import React, {useState, useEffect} from 'react'
import './Login.css'
import {Button, CircularProgress} from '@material-ui/core'
import {provider, auth} from '../../firebase/firebase'
import {set_user} from '../../rootReducer'
import {useSelector, useDispatch} from 'react-redux'
import fb from './img/fb.jpg'
import db from '../../firebase/firebase'
import {useNavigate} from 'react-router-dom'

function Login() {
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    let userProfile = {}
 
    const signIn = () => {
        auth.signInWithPopup(provider).then((result => {
            dispatch({
                type: set_user,
                user: result.additionalUserInfo.profile,       
            })
            userProfile.userId = result.additionalUserInfo.profile.id
            userProfile.username = result.additionalUserInfo.profile.name
            userProfile.profilePic = result.additionalUserInfo.profile.picture
            registerUser()
            navigate('/');
    })).catch(error => alert(error.message));
    }

    const registerUser = () => {
        db.collection('users').doc(userProfile.userId).set({
            userId: userProfile.userId,
            username: userProfile.username,
            profilePic: userProfile.profilePic,
            online: true
        }, { merge: true });
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 1200);
    },[])
    
return (
    <div className='login_container'>
    { loading ? 
        <CircularProgress size="3rem"/>
        :
        <div className='login_logo'>
            <img src='https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png' alt='fb_logo'/>
            <img src={fb} alt='fb_title'/>
            <div className='login_divider'></div>
            <div className='login_button'> 
                <Button type ='submit' onClick={signIn}>Signin</Button>
            </div>     
        </div>         
  }  
 </div> 
)
}

export default Login
