import db from '../firebase/firebase'

function UpdatePostFav(posts, id, fav) {
    db.collection(posts).doc(id).update({
        favourite: fav
      })

}


export default UpdatePostFav