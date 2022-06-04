import db from '../firebase/firebase'

function UpdatePostFav(posts, id, fav) {
    db.collection(posts).doc(id).update({
        favourite: fav
      })
}

function UpdatePostWithGif(posts, id, input, userPicture, userName, downloadURL, fav, gif) {
  db.collection('posts').doc(id).update({
    message: input,
    timestamp: firebase.firestore.
    FieldValue.serverTimestamp(),
    profilePic: user.picture,
    username: user.name,
    image: downloadURL,
    favourite: fav,
    gif: true
  })
}


export default UpdatePostFav

export {UpdatePostWithGif}