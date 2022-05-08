import React, { useEffect, useState } from 'react'
import Post from '../feed/post/Post'
import db from '../../../firebase/firebase'
import FlipMove from 'react-flip-move'
import '../feed/Feed.css'
import {useSelector} from 'react-redux'

function GifPosts() {
    const [posts,setPosts] = useState([]);
    const user = useSelector((state) => state.user)

    useEffect( () => {
        let isMounted = true;
        
        if (isMounted) {
            db.collection("posts").where("userId", "!=", user.id).onSnapshot((snapshot) => 
            setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data()})))
        );
        }

        return () => {
            isMounted = false
        }
    },[]);
   
    return (
        <div className='feed_container'>
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

export default GifPosts
