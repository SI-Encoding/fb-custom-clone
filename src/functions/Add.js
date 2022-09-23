import firebase from 'firebase/compat'
import db from '../firebase/firebase'

function addMessageWithImageToFirebaseCollection(input, username, downloadURL, userId) {
    db.collection('chat').add({
        message: input,
        username: username,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        img: downloadURL,
        userId: userId
    })
}

function addMessageWithOtherFilesToFirebaseCollection(input, username, fileName, downloadURL, userId) {
    db.collection('chat').add({
        message: input,
        username: username,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        url: downloadURL,
        fileName: fileName,
        userId: userId
    })
}

function addMessageWithNoFilesToFirebaseCollection(input, username, userId) {
    db.collection('chat').add({
        message: input,
        username: username,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        userId: userId
    })
}

function addPostWithGifToFirebaseCollection(input, userPicture, userName, downloadURL, fav, gif, userId) {
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

function addPostWithImageToFirebaseCollection(input, userPicture, userName, downloadURL, fav, gif, userId) {
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

function addPostWithoutImageToFirebaseCollection(input, userPicture, userName, fav, gif, userId) {
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

