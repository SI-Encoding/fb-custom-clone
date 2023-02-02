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
        db.collection("posts").orderBy('timestamp', 'desc').onSnapshot((snapshot) => 
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data()})))
        );
 
        return () => {
            setPosts([]); 
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
                        likes = {Object.keys(post.data.likes || {}).length}
                        liked = {post.data.likes}
                        userId = {post.data.userId}
                        sharedFrom = {post.data.sharedFrom}
                        link = {post.data.link}
                    />
                </FlipMove>
            ))}
        </div>
    )
}

export default Feed
