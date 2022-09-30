import React from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import NearMeIcon from '@material-ui/icons/NearMe'
import {ExpandMoreOutlined} from '@material-ui/icons'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

export default function PostOption({addToFavourite, favourite, setWriteComment, writeComment, setDisplayComment, displayComment}) {

    let postOptions = [
        {
            func: addToFavourite,
            state: document.createEvent('Event'),
            class: favourite,
            icon: <ThumbUpIcon/>,
            text: <p>Like</p>
        },
        {
            func: setWriteComment,
            state: !writeComment,
            class: writeComment,
            icon: <ChatBubbleOutlineIcon/>,
            text: <p>Comment</p>
        },
        {
            func: () => {},
            class: '',
            icon: <NearMeIcon/>,
            text: <p>Share</p>
        },
        {
            func: setDisplayComment,
            state: !displayComment,
            class: displayComment,
            icon: <> 
                      <AccountCircleIcon/>
                      <ExpandMoreOutlined className={`post_arrow ${displayComment? 'active' : 'inactive'}`}/>
                  </>,
            text: <> </>
        }
    ];

  return (
     <div className="post_options">
       { postOptions.map((postOption) => (
          <div onClick ={() => postOption.func(postOption.state)} className={`post_option ${postOption.class? 'active':'inactive'}`}>
            {postOption.icon}
            {postOption.text}
          </div>
        )
        )
       }
    </div>
  )
}
