# fb-custom-clone

---

This a single page application created using React.js library to create the user interface, and interacts with and stores data using Firebase services.
The purpose of this application is to demonstrate CRUD functionalities mimicking common Facebook features.

# Instructions to SETUP and RUN

---

1. Follow Step 1 to create your Firebase Project and registration: https://firebase.google.com/docs/web/setup
2. Rename .firebaserc.example to .firebaserc and replace ENTER_YOUR_FIREBASE_PROJECTID_HERE with your projectId from the Project settings at your Firebase Console.
3. In the Firebase console, head to Authentication -> Sign-in Method. Select Google as the provider and click enable and save.
4. Next, head to Firebase Firestore, and click Create database, and start in production mode. Select location you want, and click enable.
5. In Firebase Firestore, head to Rules, and delete false in line 5, and paste 'request.auth != null;' Click publish. Do the same for Firebase Storage.
6. Rename .env.example to .env and replace all ENTER_YOUR_FIREBASE with your Project's settings. It should be found at SDK setup and configuration for npm.
7. In your terminal, run 'npm install'.
8. Next, run 'npm update --force' to fix any dependency issues.
9. Finally, run 'npm start'.

# Features

- Single sign-on using Google account using Firebase Auth
- Create, edit, and delete posts and posts' comments using Firebase Cloud Firestore (The posts may contain messages with and/or supported image files)
- Send friend requests, receive notifications for requests, and privately chat with your friend by sending messages with emojis and attaching files like images or text (All files are stored using Firebase Cloud Storage)
- Change the app's theme to dark or light