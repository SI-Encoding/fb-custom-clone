import React from 'react'
import {Link} from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import StorefrontIcon from '@material-ui/icons/Storefront';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

export default function HeaderCenter(
    {
        homePage, 
        homePageActivated, 
        gifsPage, 
        gifsPageActivated, 
        myPostsPage, 
        myPostsPageActivated, 
        otherUsersPostsPage, 
        otherUsersPostsPageActivated
    }) {
  
  
    let headerOptions = [
        {
            link: '/',
            state: homePage,
            function: homePageActivated,
            icon: <HomeIcon fontSize="large"/>
        },
        {
            link: 'gifposts',
            state: gifsPage,
            function: gifsPageActivated,
            icon: <SubscriptionsIcon fontSize="large"/>
        },
        {
            link: 'myposts',
            state: myPostsPage,
            function: myPostsPageActivated,
            icon: <StorefrontIcon fontSize="large"/>
        },
        {
            link: 'otherusersposts',
            state: otherUsersPostsPage,
            function: otherUsersPostsPageActivated,
            icon: <SupervisedUserCircleIcon fontSize="large"/>
        }
    ]
  
  
    return (
    <div className = "header_center">
        { headerOptions.map((headerOption) => (
            <Link to={headerOption.link} style={{ color: `${headerOption.state? 'var(--fb-theme-colour-blue)' : 'var(--fb-theme-colour-grey)'}`, textDecoration: 'none'}}> 
                <div onClick = {headerOption.function} className={ `header_option  ${headerOption.state? 'active' : 'inactive'}`}>
                    {headerOption.icon} 
                </div>
            </Link>
        ))  
        }
    </div>
  )
}
