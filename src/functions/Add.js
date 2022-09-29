import firebase from 'firebase/compat'
import db from '../firebase/firebase'

const addMessageWithImageToFirebaseCollection = (input, username, downloadURL, userId, chatUserInfo) => {
    db.collection('chat').doc(userId).collection('messages').doc(chatUserInfo.id).collection('message').add({
        message: input,
        username: username,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        img: downloadURL,
        userId: userId
    })
    db.collection('chat').doc(chatUserInfo.id).collection('messages').doc(userId).collection('message').add({
        message: input,
        username: username,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        img: downloadURL,
        userId: userId
    })
}

const addMessageWithOtherFilesToFirebaseCollection = (input, username, fileName, downloadURL, userId, chatUserInfo) => {
    db.collection('chat').doc(userId).collection('messages').doc(chatUserInfo.id).collection('message').add({
        message: input,
        username: username,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        url: downloadURL,
        fileName: fileName,
        userId: userId
    })
    db.collection('chat').doc(chatUserInfo.id).collection('messages').doc(userId).collection('message').add({
        message: input,
        username: username,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        url: downloadURL,
        fileName: fileName,
        userId: userId
    })
}

const addMessageWithNoFilesToFirebaseCollection = (input, username, userId, chatUserInfo) => {
    db.collection('chat').doc(userId).collection('messages').doc(chatUserInfo.id).collection('message').add({
        message: input,
        username: username,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        userId: userId
    })
    db.collection('chat').doc(chatUserInfo.id).collection('messages').doc(userId).collection('message').add({
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