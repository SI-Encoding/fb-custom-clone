import React, {useEffect, useState} from 'react'
import './Feed.css'
import StoryReel from './storyreel/StoryReel'
import MessageSender from './messagesender/MessageSender'
import Post from './post/Post'
import db from '../../../firebase/firebase'
import FlipMove from 'react-flip-move'

function Feed() {
    const [posts,setPosts] = useState([]);
    
    useEffect( () => {
        let isMounted = true;
        
        if (isMounted) {
            db.collection("posts").orderBy('timestamp', 'desc').onSnapshot((snapshot) => 
            setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data()})))
            );
        }

        return () => { 
            isMounted = false 
        };
    },[]);
    
    return (
        <div className="feed_container">
            <StoryReel/>
            <MessageSender/>
            {posts.map((post) => (
                <FlipMove typeName={null}>
                    <Post
                        key = {post.id}
                        id = {post.id}
                        profilePic = {post.data.profilePic}
                        message = {post.data.message}
                        timestamp = {post.data.timestamp}
                        username = {post.data.username}
                        image = {post.data.image}
                        favourite = {post.data.favourite}
                        userId = {post.data.userId}
                    />
                </FlipMove>
            ))}
        </div>
    )
}

export default Feed
