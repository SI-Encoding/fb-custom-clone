import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import People from '../../../body/sidebar/peoplelist/People'

export default function SharedPostMenu({sharedPosts, sharedPostNotifications, setSharedPostMenu, sharedPostRef}) {
    const user = useSelector((state) => state.user)

    useEffect(()=> {

        if (sharedPostNotifications.length === 0) {
            setSharedPostMenu(false)
        }
        
    },[sharedPostNotifications])
   
  return (
    <div className="notifications_container" ref={sharedPostRef}>
        { sharedPostNotifications.length !== 0 && 
            <>
                <div className="header_menu_signin_nav_arrow"></div>
                <div className="friends_request_container">
                    <h4>Shared Posts</h4>
                    {sharedPosts.map((person) => (
                    <div style={{background:'white'}}>
                    { 
                        <People
                            usersId={user.id}
                            key={person.id}
                            id={person.id}
                            profilePic={person.data.profilePic}
                            username={person.data.username}
                            image={person.data.image}
                            status={'sharedPosts'}
                        />  
                    }
                    </div>
                ))
                }  
                </div>
            </>
        }
    </div>
  )
}
