import db from '../firebase/firebase'

const deleteFromFirebaseCollection = (collection, id) => {
    db.collection(collection).doc(id).delete().then(() => {
        console.log('comment successfully deleted ')
    }).catch((error) => {
        console.log('error failed to delete comment', error)
    })
}

const deleteMessageFromFirebaseCollection = (chat, userId, messages, message, messageId, chatUserInfo) => {
    db.collection(chat).doc(userId).collection(messages).doc(chatUserInfo.id).collection(message).doc(messageId).delete().then(() => {
        console.log('comment successfully deleted ')
    }).catch((error) => {
        console.log('error failed to delete comment')
    })
    db.collection(chat).doc(chatUserInfo.id).collection(messages).doc(userId).collection(message).doc(messageId).delete().then(() => {
        console.log('comment successfully deleted ')
    }).catch((error) => {
        console.log('error failed to delete comment')
    })
}

const deletePostCommentFromFirebaseCollection = (posts, comments, postId, commentId) => {
    db.collection(posts).doc(postId).collection(comments).doc(commentId).delete().then(() => {
        console.log('comment successfully deleted ')
    }).catch((error) => {
        console.log('error failed to delete comment')
    })
}

export default deleteFromFirebaseCollection;
export {deletePostCommentFromFirebaseCollection, deleteMessageFromFirebaseCollection}