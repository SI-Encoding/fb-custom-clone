import React from 'react'
import './Widgets.css'
import {useSelector} from 'react-redux'

function Widgets() {

    const page = useSelector((state) => state.page)

return (
    <div className='widgets_container'>
        <iframe 
            src= {page.src}
            title= {page.title}
            width='340'
            height='100%'
            style={{border: 'none', overflow: 'hidden'}}
            scrolling='no'
            frameBorder='0'
            allowtransparency='true'
            allow='encrypted-media'>
        </iframe>
    </div>
)
}

export default Widgets
