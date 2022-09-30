import React, {useEffect} from 'react'
import './HeaderDropDownMenu.css'
import EditIcon from '@material-ui/icons/Edit';
import {useDispatch, useSelector} from 'react-redux'
import {set_user, set_dark_mode} from '../../../rootReducer'
import db, {auth} from '../../../firebase/firebase'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkMode from '../../../functions/DarkMode' 
import LightMode from '../../../functions/LightMode'


function DropDownSignOutPopup({setLogoutPopup}){
    const dispatch = useDispatch(); 
    const user = useSelector((state) => state.user)
    const darkMode = useSelector((state) => state.darkMode)

    const signOut = () => {
        db.collection('users').doc(user.id).set({
            online: false
        }, { merge: true });
        dispatch({
            type: set_user,
            user: null
        })   
        auth.signOut();
        setLogoutPopup(false)
    }

    const setMode = (mode) => {

        localStorage.setItem("mode", mode)
           dispatch({
                type: set_dark_mode,
                darkMode: mode
            })
    }

   useEffect(()=> {
    darkMode?  DarkMode(): LightMode()
  },[darkMode])

    return (
        <div className='dropDownSignOut_container'>
            <ul>
                <li onClick={()=> darkMode? setMode(false) : setMode(true)}> {darkMode?  (<><LightModeIcon/>Light Mode</>) : (<><DarkModeIcon/>Dark Mode</>)}</li>
                <li onClick={signOut}><EditIcon/>Sign Out</li>
            </ul>
        </div>    
    )
}

export default DropDownSignOutPopup
