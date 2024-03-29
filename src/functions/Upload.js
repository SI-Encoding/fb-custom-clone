import {getDownloadURL, uploadBytes} from 'firebase/storage'
import firebase from 'firebase/compat'
import {updatePostWithGif, updatePostWithImage} from './Update'
import {addPostWithMediaToFirebaseCollection} from './Add'

const storageRef = firebase.storage();
  
const uploadPostsWithGif = (action, fileName, imageUrl, posts, id, input, userPicture, userName, fav, gif, userId) => { 
    let store = storageRef.ref(`/posts/${fileName}`);
    uploadBytes(store, imageUrl).then(snapshot => {
        return getDownloadURL(snapshot.ref)
  }).then(downloadURL => {
    action === 'add' ?
    addPostWithMediaToFirebaseCollection(input, userPicture, userName, downloadURL, fav, gif, userId)
    :
    updatePostWithGif(posts, id, input, userPicture, userName, downloadURL, fav, gif)
  })
}

const uploadPostsWithImage = (action, fileName, imageUrl, posts, id, input, userPicture, userName, fav, gif, userId) => { 
  let store = storageRef.ref(`/posts/${fileName}`);
  uploadBytes(store, imageUrl).then(snapshot => {
      return getDownloadURL(snapshot.ref)
  }).then(downloadURL => {
    action === 'add' ?
    addPostWithMediaToFirebaseCollection(input, userPicture, userName, downloadURL, fav, gif, userId)
    :
    updatePostWithImage(posts, id, input, userPicture, userName, downloadURL, fav, gif)
})
}

const handleFile = (e, setImagePreview, setPopup, popUp, setImageUrl, setFileName, setFileType) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setPopup(!popUp); 
    setImageUrl(e.target.files[0]); 
    setFileName(e.target.files[0].name); 
    setFileType(e.target.files[0].type);
    URL.revokeObjectURL(e.target.files[0]);
    e.target.value = null;
}

export default uploadPostsWithGif

export {uploadPostsWithImage, handleFile}