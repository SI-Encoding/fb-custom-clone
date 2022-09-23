import db from '../firebase/firebase'

function deleteFromFirebaseCollection(collection, id) {
    db.collection(collection).doc(id).delete().then(() => {
        console.log('comment successfully deleted ')
    }).catch((error) => {
        console.log('error failed to delete comment', error)
    })
}

function deletePostCommentFromFirebaseCollection (posts, comments, postId, commentId) {
    db.collection(posts).doc(postId).collection(comments).doc(commentId).delete().then(() => {
        console.log('comment successfully deleted ')
    }).catch((error) => {
        console.log('error failed to delete comment')
    })
}

export default deleteFromFirebaseCollection;
export {deletePostCommentFromFirebaseCollection}