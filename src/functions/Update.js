import db from '../firebase/firebase'
import firebase from 'firebase/compat'

const updatePostFav = (posts, id, fav) => {
    db.collection(posts).doc(id).update({
        favourite: fav
    })  
}

const updatePostWithGif = (posts, id, input, userPicture, userName, downloadURL, fav, gif) => {
  db.collection(posts).doc(id).update({
    message: input,
    timestamp: firebase.firestore.
    FieldValue.serverTimestamp(),
    profilePic: userPicture,
    username: userName,
    image: downloadURL,
    favourite: fav,
    gif: gif
  })
}

const updatePostWithImage = (posts, id, input, userPicture, userName, downloadURL, fav, gif) => {
  db.collection(posts).doc(id).update({
    message: input,
    timestamp: firebase.firestore.
    FieldValue.serverTimestamp(),
    profilePic: userPicture,
    username: userName,
    image: downloadURL,
    favourite: fav,
    gif: gif
  })
}

const updatePostWithNoAttachment = (posts, id, input, userPicture, userName, fav, gif) => {
  db.collection(posts).doc(id).update({
    message: input,
    timestamp: firebase.firestore.
    FieldValue.serverTimestamp(),
    profilePic: userPicture,
    username: userName,
    favourite: fav,
    gif: gif
  })
}

const updatePostComment = (posts, postId, comments, commentId, comment, usernameName, usernamePicture) => {
  db.collection(posts).doc(postId).collection(comments).doc(commentId).update({
    message: comment,
    time: firebase.firestore.FieldValue.serverTimestamp(),
    user: usernameName,
    userImage: usernamePicture
  })
}

const addFriend = (usersId, id, users) => {
  db.collection(users).doc(usersId).set({
            friends: {[id]: 'Accept Request'}
    }, {merge: 'true'})
        db.collection(users).doc(id).set({
            friends: {[usersId]: 'Friend Request Sent'}
    }, {merge: 'true'})
}

const acceptRequest = (usersId, id, users) => {
  db.collection(users).doc(usersId).set({
            friends: {[id]: 'Remove'}
        }, {merge: 'true'})
       db.collection(users).doc(id).set({
            friends: {[usersId]: 'Remove'}
        }, {merge: 'true'})
}

const removeFriend = (usersId, id, users) => {
  db.collection(users).doc(usersId).set({
        friends: {[id]: 'Add Friend'}  
    }, {merge: 'true'})        
    db.collection(users).doc(id).set({        
        friends: {[usersId]: 'Add Friend'}     
    }, {merge: 'true'})  
}

export default updatePostFav

export {updatePostWithGif, updatePostWithImage, updatePostWithNoAttachment, updatePostComment, addFriend, acceptRequest, removeFriend}