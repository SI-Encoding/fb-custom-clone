import React, {useState,useEffect} from 'react'
import './DropDownSignOutPopup.css'
import EditIcon from '@material-ui/icons/Edit';
import {useDispatch} from 'react-redux'
import {set_user} from '../../../rootReducer'
import {auth} from '../../../firebase/firebase'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function DropDownSignOutPopup({setLogoutPopup}){
    const dispatch = useDispatch(); 
    const [darkMode, setDarkMode] = useState(false)

    const signOut = () => {
        auth.signOut();
  
        dispatch({
            type: set_user,
            user: null
        })   
        setLogoutPopup(false)
    }

    const darkModeColours = {
        background: '#18191a',
        storyReel: '#a29b9f',
        arrow: '#a29b9f',
        postText: '#a29b9f',
        messageBorderTop: '#333236',
        postBorderTop: '#333236',
        postOption: '#a29b9f',
        text: '#a29b9f',
        textField: '#444148',
        posts: '#2a292e',
        header: '#2a292e'
    }

    const lightModeColours = {
        background: '#f1f2f5',
        storyReel: '#2e81f4',
        arrow: 'rgba(0, 0, 0, 0.54)',
        postText: '#000000',
        messageBorderTop: '#eff2f5',
        postBorderTop: 'lightgray',
        postOption: 'gray',
        text: '#000000',
        textField: '#eff2f5',
        posts: 'white',
        header: 'white'
    }
   
    const setPropertyOfDarkMode = () => {
        document.documentElement.style.setProperty("--fb-theme-colour-white-header", darkModeColours.header);
        document.documentElement.style.setProperty("--fb-theme-colour-white-posts", darkModeColours.posts);
        document.documentElement.style.setProperty("--fb-theme-colour-textfield", darkModeColours.textField);
        document.documentElement.style.setProperty("--fb-theme-colour-text", darkModeColours.text);
        document.documentElement.style.setProperty("--fb-theme-colour-post-option", darkModeColours.postOption);
        document.documentElement.style.setProperty("--fb-theme-colour-post-border-top", darkModeColours.postBorderTop);
        document.documentElement.style.setProperty("--fb-theme-colour-messenger-sender-border-top", darkModeColours.messageBorderTop);
        document.documentElement.style.setProperty("--fb-theme-colour-post-text", darkModeColours.postText);
        document.documentElement.style.setProperty("--fb-theme-colour-arrow", darkModeColours.arrow);
        document.documentElement.style.setProperty("--fb-theme-colour-storyreel", darkModeColours.storyReel);
        document.documentElement.style.setProperty("--fb-theme-colour-background", darkModeColours.background);
    }

    const setPropertyOfLightMode = () => {
        document.documentElement.style.setProperty("--fb-theme-colour-white-header", lightModeColours.header);
        document.documentElement.style.setProperty("--fb-theme-colour-white-posts", lightModeColours.posts);
        document.documentElement.style.setProperty("--fb-theme-colour-textfield", lightModeColours.textField);
        document.documentElement.style.setProperty("--fb-theme-colour-text", lightModeColours.text);
        document.documentElement.style.setProperty("--fb-theme-colour-post-option", lightModeColours.postOption);
        document.documentElement.style.setProperty("--fb-theme-colour-post-border-top", lightModeColours.postBorderTop);
        document.documentElement.style.setProperty("--fb-theme-colour-messenger-sender-border-top", lightModeColours.messageBorderTop);
        document.documentElement.style.setProperty("--fb-theme-colour-post-text", lightModeColours.postText);
        document.documentElement.style.setProperty("--fb-theme-colour-arrow", lightModeColours.arrow);
        document.documentElement.style.setProperty("--fb-theme-colour-storyreel", lightModeColours.storyReel);
        document.documentElement.style.setProperty("--fb-theme-colour-background", lightModeColours.background);
    }
    const changeColour = () => {
        setDarkMode(!darkMode)
        if (!darkMode) {
            setPropertyOfDarkMode()
        } else {
            setPropertyOfLightMode()
        }
    }

    return (
        <div className='dropDownSignOut_container'>
            <ul>
                <li onClick={()=> changeColour()}> {!darkMode? (<><DarkModeIcon/>Dark Mode</>) : (<><LightModeIcon/>Light Mode</>)}</li>
                <li onClick={signOut}><EditIcon/>Sign Out</li>
            </ul>
        </div>    
    )
}

export default DropDownSignOutPopup
