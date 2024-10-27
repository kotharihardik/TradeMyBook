// src/database.js
import { db } from './firebase/firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';

// Users Collection
export const createUserProfile = async (userId, profileData) => {
  await setDoc(doc(db, 'users', userId), profileData);
};

export const getUserProfile = async (userId) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

// Books Collection
export const addBook = async (bookData) => {
  const booksRef = collection(db, 'books');
  const newDocRef = await setDoc(doc(booksRef), bookData);
  return newDocRef.id;
};

export const getBooks = async () => {
  const booksRef = collection(db, 'books');
  const booksSnapshot = await getDocs(booksRef);
  return booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Requests Collection
export const addRequest = async (requestData) => {
  const requestsRef = collection(db, 'requests');
  await setDoc(doc(requestsRef), requestData);
};

export const getRequestsByUserId = async (userId) => {
  const requestsRef = collection(db, 'requests');
  const q = query(requestsRef, where('requester', '==', userId));
  const requestsSnapshot = await getDocs(q);
  return requestsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Messages Collection
export const sendMessage = async (messageData) => {
  const messagesRef = collection(db, 'messages');
  await setDoc(doc(messagesRef), messageData);
};

export const getMessages = async (userId) => {
  const messagesRef = collection(db, 'messages');
  const q = query(messagesRef, where('receiver_id', '==', userId), orderBy('timestamp'));
  const messagesSnapshot = await getDocs(q);
  return messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

