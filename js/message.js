// import { initializeApp } from "./firebase/app";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



// No need to change any code below this line.
// These are the correct imports for a static website.


const firebaseConfig = {
    apiKey: "AIzaSyC_DmaKkzUBA7ewTRfHQpus3JtWkUj5EbA",
    authDomain: "softymatcha-8dcaa.firebaseapp.com",
    projectId: "softymatcha-8dcaa",
    storageBucket: "softymatcha-8dcaa.firebasestorage.app",
    messagingSenderId: "843459835041",
    appId: "1:843459835041:web:8660c2ddb583f5e0ac6ce0",
    measurementId: "G-5Q72VMPCP0"
};


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

try {
    // 1. Initialize Firebase with your config
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // 2. Sign in to get permission to write to the database
    signInAnonymously(auth).catch(error => {
        console.error("Anonymous sign-in failed:", error);
    });

    // 3. Get references to the form elements
    const messagesCollection = collection(db, "messages");
    const messageForm = document.getElementById('message-form');
    const formStatus = document.getElementById('form-status');

    // 4. Listen for the form submission
    if (messageForm) {
        messageForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // This stops the page from refreshing

            const nameInput = document.getElementById('sender-name');
            const textInput = document.getElementById('message-text');
            const name = nameInput.value.trim();
            const text = textInput.value.trim();

            if (name && text) {
                try {
                    // 5. Send the message to your Firestore database
                    await addDoc(messagesCollection, {
                        name: name,
                        text: text,
                        timestamp: serverTimestamp()
                    });

                    messageForm.reset();
                    formStatus.textContent = "Thank you, your message has been sent!";
                    formStatus.style.color = 'green';

                } catch (error) {
                    console.error("Error sending message: ", error);
                    formStatus.textContent = "An error occurred. Please try again.";
                    formStatus.style.color = 'red';
                } finally {
                    setTimeout(() => { formStatus.textContent = ''; }, 4000);
                }
            }
        });
    }
} catch (e) {
    console.error("Firebase initialization error. Please check your config keys and quotes.", e);
    const status = document.getElementById('form-status');
    if(status){
        status.textContent = 'Guestbook could not be loaded. Check console.';
        status.style.color = 'orange';
    }
}

