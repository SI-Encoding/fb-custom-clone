const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const {db} = require('./firebase/firebase')
const firebase = require('firebase-admin')
app.listen(port, ()=> console.log(`Server running on port ${port}`))

app.use(cors())
app.use(express.json());

app.post('/fb-clone-post',  (req,res) => {
    db.collection('posts').add({    
        message: req.body.message,  
        profilePic: req.body.profilePic,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),    
        username: req.body.username,    
        image: req.body.image,    
        favourite: req.body.favourite,  
        gif: req.body.gif,
        userId: req.body.userId,
        sharedFrom: req.body.sharedFrom            
    })

    res.status(200).send('Successfully shared post')
})