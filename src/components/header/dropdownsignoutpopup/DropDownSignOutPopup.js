import React, {useState} from 'react'
import './DropDownSignOutPopup.css'
import EditIcon from '@material-ui/icons/Edit';
import {useDispatch} from 'react-redux'
import {set_user} from '../../../rootReducer'
import {auth} from '../../../firebase/firebase'

function DropDownSignOutPopup({setLogoutPopup}){

    const dispatch = useDispatch(); 
  


    const signOut = () => {

        auth.signOut();
  
      dispatch({
        type: set_user,
        user: null
     })   
   
    
    setLogoutPopup(false)
    }

    return (
        <div className='dropDownSignOut_container'>
             <ul>
            <li onClick={signOut}><EditIcon/>Sign Out</li>
            
        </ul>
        </div>
        
       
        
    )
}

export default DropDownSignOutPopup
