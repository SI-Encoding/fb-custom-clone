import db from '../firebase/firebase'
import firebase from 'firebase/compat'

function UpdatePostFav(posts, id, fav) {
    db.collection(posts).doc(id).update({
        favourite: fav
    })  
}

function UpdatePostWithGif(posts, id, input, userPicture, userName, downloadURL, fav, gif) {
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

function UpdatePostWithImage(posts, id, input, userPicture, userName, downloadURL, fav, gif) {
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

function UpdatePostWithNoAttachment(posts, id, input, userPicture, userName, fav, gif) {
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

function UpdatePostComment(posts, postId, comments, commentId, comment, usernameName, usernamePicture) {
  db.collection(posts).doc(postId).collection(comments).doc(commentId).update({
    message: comment,
    time: firebase.firestore.FieldValue.serverTimestamp(),
    user: usernameName,
    userImage: usernamePicture
})
}

export default UpdatePostFav

export {UpdatePostWithGif, UpdatePostWithImage, UpdatePostWithNoAttachment, UpdatePostComment}