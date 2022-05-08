import React from 'react'
import './SideBar.css'
import SideBarRow from './sidebarrow/SideBarRow'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags'
import PeopleIcon from '@material-ui/icons/People'
import ChatIcon from '@material-ui/icons/Chat'
import StoreFrontIcon from '@material-ui/icons/Storefront'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import {ExpandMoreOutlined} from '@material-ui/icons'
import {useStateValue} from '../../../StateProvider'
import {useSelector} from 'react-redux'

function SideBar() {
    const user = useSelector((state) => state.user)

    return (
        <div className = "sidebar_container">
            <SideBarRow src={user.picture} title={user.name}/>  
            <SideBarRow Icon={LocalHospitalIcon} title='COVID-19 Information Center'/>
            <SideBarRow Icon={EmojiFlagsIcon} title='Pages'/> 
            <SideBarRow Icon={PeopleIcon} title='Friends'/>
            <SideBarRow Icon={ChatIcon} title='Messenger'/>
            <SideBarRow Icon={StoreFrontIcon} title='MarketPlace'/>
            <SideBarRow Icon={VideoLibraryIcon} title='Videos'/>
            <SideBarRow Icon={ExpandMoreOutlined} title='MarketPlace'/> 
        </div>
    )
}

export default SideBar;
