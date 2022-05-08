import React, {useState} from 'react'
import './DropDownEditAndDeleteMenu.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function DropDownEditAndDeleteMenu({postId, deleteThis, editThis}){
    const [openMenu, setOpenMenu] = useState(false)

    const deleteIt = () => {
        deleteThis(postId)
        setOpenMenu(true)
    }

    const editIt = () => {
        editThis()
        setOpenMenu(true)
    }        
        
    return (
        <div className='dropdown_container'>        
            {!openMenu && <ul>
                <li onClick={editIt}><EditIcon/>Edit</li>
                <li onClick={deleteIt}><DeleteIcon/>Delete</li>
            </ul>
            }
        </div>    
    )       
}            
        
export default DropDownEditAndDeleteMenu
