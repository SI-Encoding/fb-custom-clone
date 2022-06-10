import {getDownloadURL, uploadBytes} from 'firebase/storage'
import firebase from 'firebase/compat'
import {UpdatePostWithGif, UpdatePostWithImage} from './Update'
import {AddPostWithGifToFirebaseCollection} from './Add'

const storageRef = firebase.storage();
  
function UploadPostsWithGif(action, fileName, imageUrl, posts, id, input, userPicture, userName, fav, gif, userId) { 
    let store = storageRef.ref(`/posts/${fileName}`);
    uploadBytes(store, imageUrl).then(snapshot => {
        return getDownloadURL(snapshot.ref)
  }).then(downloadURL => {
    action === 'add' ?
    AddPostWithGifToFirebaseCollection(input, userPicture, userName, downloadURL, fav, gif, userId)
    :
    UpdatePostWithGif(posts, id, input, userPicture, userName, downloadURL, fav, gif)
  })
}

function UploadPostsWithImage(action, fileName, imageUrl, posts, id, input, userPicture, userName, fav, gif, userId) { 
  let store = storageRef.ref(`/posts/${fileName}`);
  uploadBytes(store, imageUrl).then(snapshot => {
      return getDownloadURL(snapshot.ref)
  }).then(downloadURL => {
    UpdatePostWithImage(posts, id, input, userPicture, userName, downloadURL, fav, gif)
})
}

export default UploadPostsWithGif

export {UploadPostsWithImage}