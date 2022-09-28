import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import './NotificationsMenu.css'
import People from '../../../body/sidebar/peoplelist/People';

export default function NotificationsMenu({requests, notifications, setMenu}) {
    const user = useSelector((state) => state.user)

    useEffect(()=> {

        if (notifications.length === 0) {
            setMenu(false)
        }
    },[notifications])
   
  return (
    <div className="notifications_container">
        { notifications.length !== 0 && 
            <>
                <div className="header_menu_signin_nav_arrow"></div>
                <div className="friends_request_container">
                    <h4>Friend Requests</h4>
                    {requests.map((person) => (
                    <div style={{background:'white'}}>
                    { person.data.friends[user.id] === 'Accept Request' &&
                        <People
                            usersId={user.id}
                            key={person.id}
                            id={person.id}
                            profilePic={person.data.profilePic}
                            username={person.data.username}
                            status={person.data.friends[user.id]}
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
