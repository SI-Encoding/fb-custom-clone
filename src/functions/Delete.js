import db from '../firebase/firebase'

function DeleteFromFirebaseCollection(collection, id) {
    db.collection(collection).doc(id).delete().then(() => {
        console.log('comment successfully deleted ')
    }).catch((error) => {
        console.log('error failed to delete comment', error)
    })
}

export default DeleteFromFirebaseCollection;