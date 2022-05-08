import React from 'react'
import './ChatHeader.css'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import MaximizeIcon from '@material-ui/icons/Maximize';

function ChatHeader({expand, expandMenu, closeMenu}) {

    return (
        <div className={`chat_header ${expand ? 'active' : 'inactive'}`}>
            <div className='toolbar_status_logo'>
                <span className='status'/>
            </div>
            <div>
            <p className='title'>Public Chat</p>
            </div>
            <div className='toobar_enlarger_button'>
            {expand? <MaximizeIcon onClick={closeMenu} className='minus'/> :<CheckBoxOutlineBlankIcon onClick={expandMenu} className='max'/>    }
            </div>            
        </div>   
    )
}

export default ChatHeader


    


