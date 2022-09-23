import firebase from 'firebase/compat'
import db from '../firebase/firebase'

const addMessageWithImageToFirebaseCollection = (input, username, downloadURL, userId) => {
    db.collection('chat').add({
        message: input,
        username: username,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        img: downloadURL,
        userId: userId
    })
}

const addMessageWithOtherFilesToFirebaseCollection = (input, username, fileName, downloadURL, userId) => {
    db.collection('chat').add({
        message: input,
        username: username,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        url: downloadURL,
        fileName: fileName,
        userId: userId
    })
}

const addMessageWithNoFilesToFirebaseCollection = (input, username, userId) => {
    db.collection('chat').add({
        message: input,
        username: username,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        userId: userId
    })
}

const addPostWithGifToFirebaseCollection = (input, userPicture, userName, downloadURL, fav, gif, userId) => {
    db.collection('posts').add({    
        message: input,  
        timestamp: firebase.firestore.      
        FieldValue.serverTimestamp(),
        profilePic: userPicture,      
        username: userName,    
        image: downloadURL,    
        favourite: fav,  
        gif: gif,
        userId: userId            
    })
}

const addPostWithImageToFirebaseCollection = (input, userPicture, userName, downloadURL, fav, gif, userId) => {
    db.collection('posts').add({            
        message: input,            
        timestamp: firebase.firestore.            
        FieldValue.serverTimestamp(),    
        profilePic: userPicture,      
        username: userName,        
        image: downloadURL,      
        favourite: fav,      
        gif: gif,
        userId: userId   
    })
}

const addPostWithoutImageToFirebaseCollection = (input, userPicture, userName, fav, gif, userId) => {
    db.collection('posts').add({              
        message: input,              
        timestamp: firebase.firestore.              
        FieldValue.serverTimestamp(),              
        profilePic: userPicture,              
        username: userName,              
        favourite: fav,
        gif: gif,
        userId: userId    
    })
}

export default addMessageWithImageToFirebaseCollection

export {addMessageWithOtherFilesToFirebaseCollection, addMessageWithNoFilesToFirebaseCollection, addPostWithGifToFirebaseCollection, addPostWithImageToFirebaseCollection, addPostWithoutImageToFirebaseCollection}