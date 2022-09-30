import React from 'react'

export default function PeopleActivity({online}) {
  return (
    <>
        {online ? 
                <div className='toolbar_status_logo'>
                <span className='status-online'/>
                </div>  
                : 
                <div className='toolbar_status_logo'>
                <span className='status-offline'/>
                </div>  
        }     
    </>
  )
}
