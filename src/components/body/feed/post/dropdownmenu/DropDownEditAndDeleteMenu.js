import React, {useState, useEffect, useRef} from 'react'
import './DropDownEditAndDeleteMenu.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function DropDownEditAndDeleteMenu({postId, deleteThis, editThis, open, setOpen}){
    const [openMenu, setOpenMenu] = useState(false)
    const dropDownRef = useRef(null)
    
    const deleteIt = () => {
        deleteThis(postId)
        setOpenMenu(true)
    }

    const editIt = () => {
        editThis()
        setOpenMenu(true)
    }        
        
    useEffect( ()=> {

        const pageClickEvent = (e) => {
          if (dropDownRef.current !== null && !dropDownRef.current.contains(e.target)) {
            setOpen(!open);}
          };
       
          {/* If the item is active (ie open) then listen for clicks */}
          if (open) {
            window.addEventListener('click', pageClickEvent);
          }

          {/* cleans up when unmounted */}
          return () => {
            window.removeEventListener('click', pageClickEvent);
          }
        },[open])

    return (
        <div ref = {dropDownRef} className='dropdown_container'>        
            {!openMenu && <ul>
                <li onClick={editIt}><EditIcon/>Edit</li>
                <li onClick={deleteIt}><DeleteIcon/>Delete</li>
            </ul>
            }
        </div>    
    )       
}            
        
export default DropDownEditAndDeleteMenu
