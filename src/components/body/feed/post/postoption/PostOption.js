import React from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import NearMeIcon from '@material-ui/icons/NearMe'
import {ExpandMoreOutlined} from '@material-ui/icons'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import {useSelector} from 'react-redux'

export default function PostOption({likePost, like, numberOfLikes, share, sharePost, setWriteComment, writeComment, setDisplayComment, displayComment, setMustSignin, mustSignin}) {
    const user = useSelector(state => state.user)
    const postOptions = [
        {
            func: user ? likePost : setMustSignin,
            state: user ? !like : !mustSignin,
            class: like,
            like: numberOfLikes !== 0 && numberOfLikes,
            icon: <ThumbUpIcon/>,
            text: <p>Like</p>
        },
        {
            func: user ? setWriteComment : setMustSignin,
            state: user ? !writeComment : !mustSignin,
            class: writeComment,
            icon: <ChatBubbleOutlineIcon/>,
            text: <p>Comment</p>
        },
        {
            func: user ? sharePost : setMustSignin,
            state: user? !share : !mustSignin,
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
            {postOption.like}
            {postOption.icon}
            {postOption.text}
          </div>
        )
        )
       }
    </div>
  )
}
