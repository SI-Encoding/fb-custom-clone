import React from 'react'
import './SideBar.css'
import SideBarRow from './sidebarrow/SideBarRow'
import {useSelector} from 'react-redux'
import HomeIcon from '@material-ui/icons/Home';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import StorefrontIcon from '@material-ui/icons/Storefront';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import PeopleList from './peoplelist/PeopleList'

function SideBar() {
    const user = useSelector((state) => state.user)

    return (
        <div className = "sidebar_container">
            {user && <SideBarRow src={user.picture} title={user.name}/> }
            <SideBarRow Icon={HomeIcon} title='Home'/>
            <SideBarRow Icon={SubscriptionsIcon} title='Gifs'/> 
            <SideBarRow Icon={StorefrontIcon} title='Your Posts'/>
            <SideBarRow Icon={SupervisedUserCircleIcon} title="Other User's Posts"/>
            <PeopleList/>
        </div>
    )
}

export default SideBar;
