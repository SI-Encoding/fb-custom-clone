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
    const time = firebaseAdmin.firestore.              
    FieldValue.serverTimestamp()
    const postMock = {
      message: '1',              
      timestamp: time,              
      profilePic: "userPicture",              
      username: "userName",              
      favourite: false,
      gif: false,
      userId: "userId"
    }
    await db.collection('posts').doc('1').set({
      message: '1',              
      timestamp: time,              
      profilePic: "userPicture",              
      username: "userName",              
      favourite: false,
      gif: false,
      userId: "userId"
    })
    const post = await db.collection('posts').doc('1').get()
    expect(post.data()).toMatchObject(postMock)
  })
  it('it should update document to the post collection', async() => {
    await db.collection('posts').doc('1').set({
      message: '2',              
      timestamp: firebaseAdmin.firestore.              
      FieldValue.serverTimestamp(),              
      profilePic: "userPicture",              
      username: "userName",              
      favourite: false,
      gif: false,
      userId: "userId"
    })
    const post = await db.collection('posts').doc('1').get()
    
    expect(post.data()['message']).toEqual("2")
  })

  it('it should delete the document from the post collection', async() => {
    await db.collection('posts').doc('1').delete()
    const post = await db.collection('posts').doc('1').get()
    expect(post.data()).toEqual(undefined)
  })
})

describe('test posts comments functionality', ()=> {
  it('it should add a nested document to the posts comment collection', async()=> {
    const time = firebaseAdmin.firestore.FieldValue.serverTimestamp()
    const postMock = {
      message: 'comment',
      time: time,
      user: 'usernameName',
      userImage: 'usernamePicture'
    }
    await db.collection('posts').doc('1').collection('comments').doc('1').set({
      message: 'comment',
      time: time,
      user: 'usernameName',
      userImage: 'usernamePicture'
    })
    const post = await db.collection('posts').doc('1').collection('comments').doc('1').get()
    expect(post.data()).toMatchObject(postMock)
  })
  it('it should update nested document to the posts comment collection', async()=> {
  await db.collection('posts').doc('1').collection('comments').doc('1').set({
    message: '2',
    time: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
    user: 'usernameName',
    userImage: 'usernamePicture'
  })
  const post = await db.collection('posts').doc('1').collection('comments').doc('1').get()
  expect(post.data()['message']).toEqual('2')
  })
})

describe('test chat functionality', () => {
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

describe('test friend functionality', () => {
  it('it should add a nested document to the friend collection' , async() => {
    await db.collection('users').doc('1').set({
      friends: {['1']: 'Accept Request'}
  })
  db.collection('users').doc('2').set({
      friends: {['2']: 'Friend Request Sent'}
  })
  const friend1 = await db.collection('users').doc('1').get()
  const friend2 = await db.collection('users').doc('2').get()
  expect(friend1.data()).toEqual({"friends": {"1": "Accept Request"}})
  expect(friend2.data()).toEqual({"friends": {"2": "Friend Request Sent"}})
  })

  it('it should update document to the friend collection' , async() => {
    await db.collection('users').doc('1').set({
      friends: {['1']: 'Remove'}
  })
  db.collection('users').doc('2').set({
      friends: {['2']: 'Remove'}
  })
  const friend1 = await db.collection('users').doc('1').get()
  const friend2 = await db.collection('users').doc('2').get()
  expect(friend1.data()).toEqual({"friends": {"1": 'Remove'}})
  expect(friend2.data()).toEqual({"friends": {"2": 'Remove'}})
  })

  it('it should remove document from the friend collection' , async() => {
    await db.collection('users').doc('1').set({
      friends: {['1']: 'Add Friend'}
  })
  db.collection('users').doc('2').set({
      friends: {['2']: 'Add Friend'}
  })
  const friend1 = await db.collection('users').doc('1').get()
  const friend2 = await db.collection('users').doc('2').get()
  expect(friend1.data()).toEqual({"friends": {"1": 'Add Friend'}})
  expect(friend2.data()).toEqual({"friends": {"2": 'Add Friend'}})
  })
})