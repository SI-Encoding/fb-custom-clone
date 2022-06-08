import {getDownloadURL, uploadBytes} from 'firebase/storage'
import firebase from 'firebase/compat'
import UpdatePostFav, {UpdatePostWithGif, UpdatePostWithImage, UpdatePostWithNoAttachment} from './Update'

const storageRef = firebase.storage();
  


function UploadPostsWithGif(fileName, imageUrl, posts, id, input, userPicture, userName, fav, gif) { 
    let store = storageRef.ref(`/posts/${fileName}`);
    uploadBytes(store, imageUrl).then(snapshot => {
        return getDownloadURL(snapshot.ref)
  }).then(downloadURL => {
    UpdatePostWithGif(posts, id, input, userPicture, userName, downloadURL, fav, gif)
  })
}

export default UploadPostsWithGif