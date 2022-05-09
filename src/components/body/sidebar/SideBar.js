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
import HomeIcon from '@material-ui/icons/Home';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import StorefrontIcon from '@material-ui/icons/Storefront';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

function SideBar() {
    const user = useSelector((state) => state.user)

    return (
        <div className = "sidebar_container">
            <SideBarRow src={user.picture} title={user.name}/>  
            <SideBarRow Icon={HomeIcon} title='Home'/>
            <SideBarRow Icon={SubscriptionsIcon} title='Gifs'/> 
            <SideBarRow Icon={StorefrontIcon} title='Your Posts'/>
            <SideBarRow Icon={SupervisedUserCircleIcon} title="Other User's Posts"/>
        </div>
    )
}

export default SideBar;
