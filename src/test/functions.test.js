const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_apiKey}`,
  authDomain: `${process.env.REACT_APP_authDomain}`,
  projectId: `${process.env.REACT_APP_projectId}`,
  storageBucket: `${process.env.REACT_APP_storageBucket}`,
  messagingSenderId: `${process.env.REACT_APP_messagingSenderId}`,
  appId: `${process.env.REACT_APP_appId}`,
  measurementId: `${process.env.REACT_APP_measurementId}`
};

const firebaseAdmin = require('firebase-admin');

const useEmulator = true;

if (useEmulator){
    process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';
}

const firebase = firebaseAdmin.initializeApp(firebaseConfig);
const db = firebase.firestore();

describe('test post functionality', () => {
  it('it should add a document to the post collection', async () => {
    await db.collection('post').doc('1').set({
      message: '1',              
      timestamp: firebaseAdmin.firestore.              
      FieldValue.serverTimestamp(),              
      profilePic: "userPicture",              
      username: "userName",              
      favourite: false,
      gif: false,
      userId: "userId"
    })
    const post = await db.collection('post').doc('1').get()
    
    expect(post.data()['message']).toEqual("1")
  })
  it('it should update nested document to the post collection', async() => {
    await db.collection('post').doc('1').set({
      message: '2',              
      timestamp: firebaseAdmin.firestore.              
      FieldValue.serverTimestamp(),              
      profilePic: "userPicture",              
      username: "userName",              
      favourite: false,
      gif: false,
      userId: "userId"
    })
    const post = await db.collection('post').doc('1').get()
    
    expect(post.data()['message']).toEqual("2")
  })

  it('it should delete the document from the post collection', async() => {
    await db.collection('post').doc('1').delete()
    const post = await db.collection('post').doc('1').get()
    expect(post.data()).toEqual(undefined)
  })
})

describe('test chat functionality', async() => {
  it('it should add a nested document to the chat collection', async() => {
    await db.collection('chat').doc('1').collection('messages').doc('1').collection('message').doc('1').set({
      message: '1',
      username: 'username',
      time: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
      userId: '1'
  }).then(() => {
      db.collection('chat').doc('2').collection('messages').doc('2').collection('message').doc('2').set({
          message: '1',
          username: 'username',
          time: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
          userId: '2'
      })
  })
  const chat = await db.collection('chat').doc('1').collection('messages').doc('1').collection('message').doc('1').get()
  const chat2 = await db.collection('chat').doc('2').collection('messages').doc('2').collection('message').doc('2').get()
  expect(chat.data()['message']).toEqual(chat2.data()['message'])
  })

  it('it should update nested document to the chat collection', async() => {
    await db.collection('chat').doc('1').collection('messages').doc('1').collection('message').doc('1').set({
      message: '2',
      username: 'username',
      time: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
      userId: '1'
  }).then(() => {
      db.collection('chat').doc('2').collection('messages').doc('2').collection('message').doc('2').set({
          message: '2',
          username: 'username',
          time: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
          userId: '2'
      })
  })
  const chat = await db.collection('chat').doc('1').collection('messages').doc('1').collection('message').doc('1').get()
  const chat2 = await db.collection('chat').doc('2').collection('messages').doc('2').collection('message').doc('2').get()
  expect(chat.data()['message']).toEqual(chat2.data()['message'])
  })

  it('it should delete the document from the chat collection', async() => {
    await db.collection('chat').doc('1').delete()
    const chat = await db.collection('chat').doc('1').get()
    expect(chat.data()).toEqual(undefined)
  })
})