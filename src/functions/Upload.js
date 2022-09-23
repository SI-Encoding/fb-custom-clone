import {getDownloadURL, uploadBytes} from 'firebase/storage'
import firebase from 'firebase/compat'
import {UpdatePostWithGif, UpdatePostWithImage} from './Update'
import {AddPostWithGifToFirebaseCollection, AddPostWithImageToFirebaseCollection} from './Add'

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
    action === 'add' ?
    AddPostWithImageToFirebaseCollection(input, userPicture, userName, downloadURL, fav, gif, userId)
    :
    UpdatePostWithImage(posts, id, input, userPicture, userName, downloadURL, fav, gif)
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

export default UploadPostsWithGif

export {UploadPostsWithImage, handleFile}