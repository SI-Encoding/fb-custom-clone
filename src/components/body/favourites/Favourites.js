import React, { useEffect, useState } from 'react'
import Post from '../feed/post/Post'
import db from '../../../firebase/firebase'
import FlipMove from 'react-flip-move'
import '../feed/Feed.css'

function Favourites() {
    const [posts,setPosts] = useState([]);

    useEffect( () => {    
        let isMounted = true;
        if (isMounted) {    
            db.collection("posts").where("favourite", "==", true).orderBy('timestamp', 'desc').onSnapshot((snapshot) =>        
            setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data()})))        
            );
        }         
        return () =>         
        {isMounted = false}        
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
            ))
            }                
        </div>                
    )           
}        
    
export default Favourites


