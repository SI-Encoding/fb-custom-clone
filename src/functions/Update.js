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

export default updatePostFav

export {updatePostWithGif, updatePostWithImage, updatePostWithNoAttachment, updatePostComment}