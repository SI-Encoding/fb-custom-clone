import React from 'react'
import './Widgets.css'
import {useSelector} from 'react-redux'

function Widgets() {

    const page = useSelector((state) => state.page)

return (
    <div className='widgets_container'>
        <iframe src= {page}
            width='340'
            height='100%'
            style={{border: 'none', overflow: 'hidden'}}
            scrolling='no'
            frameborder='0'
            allowTransparency='true'
            allow='encrypted-media'>
        </iframe>
    </div>
)
}

export default Widgets
