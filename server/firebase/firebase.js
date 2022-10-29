const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv/config')

initializeApp({
 credential: cert(JSON.parse(process.env.REACT_APP_CLIENT_SECRET))
});

const db = getFirestore();

module.exports = {db}