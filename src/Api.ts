import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import {
  deleteDoc,
  DocumentData,
  getFirestore,
  QueryDocumentSnapshot,
  doc,
  DocumentReference,
  UpdateData,
  setDoc,
  getDoc,
  query,
  where,
  documentId,
  deleteField,
  onSnapshot,
  arrayUnion,
} from 'firebase/firestore';
import { collection, addDoc, getDocs, updateDoc } from 'firebase/firestore';
import { ref, watch, watchEffect } from 'vue';
import * as type from './types';

import { initializeApp } from 'firebase/app';
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyD4tUkLG2x5hAoUZq3HbYCx0WQ1q-VGf7o',

  authDomain: 'haushaltshelfer-58875.firebaseapp.com',

  projectId: 'haushaltshelfer-58875',

  storageBucket: 'haushaltshelfer-58875.appspot.com',

  messagingSenderId: '78669716138',

  appId: '1:78669716138:web:d6d22f44cee1c3a8cc8ed3',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export async function addAPI<T>(docName: string, data: T): Promise<DocumentReference<T>> {
  const docRef = await addDoc(collection(getFirestore(), docName), data);
  return docRef as DocumentReference<T>;
}

export const user = ref<any>(null);
export const userData = ref<type.User | null>(null);
export const reloads = ref(0);
export const rerender = ref(0)

watch(user, async newUser => {
  const id = user.value.uid;
  if (id) userData.value = await getUserData(id);
});

export function getCurrentUser() {
  const auth = getAuth(app);
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      currentUser => {
        user.value = currentUser;
        unsubscribe();
        resolve(currentUser);
      },
      reject
    );
  });
}
(async () => {
  try {
    await getCurrentUser();
  } catch (e) {
    console.log(e);
  }
})()

export async function login(email: string, password: string): Promise<void> {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email, password);
  getCurrentUser();
}

export async function logout(): Promise<void> {
  const auth = getAuth();
  await signOut(auth);
  getCurrentUser();
  window.location.reload();
}

export async function register(name: string, email: string, password: string): Promise<void> {
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(getFirestore(), 'users', userCredential.user.uid), {
    name: name,
    role: 'user',
    groups: [],
  });
  window.location.reload();
}
export async function getUserData(uid: string): Promise<type.User> {
  return {
    ...(await getDoc(doc(getFirestore(), 'users', user.value?.uid))).data(),
    id: user.value?.uid,
    groups: await getUserGroups(uid),
  } as unknown as type.User;
}

export async function getUserGroups(uid: string) {
  let docs: QueryDocumentSnapshot<DocumentData>[] = [];
  const q = query(collection(getFirestore(), 'groups'), where('users', 'array-contains-any', [uid]));
  const unsubscribe = onSnapshot(q, querySnapshot => {
    querySnapshot.forEach(doc => {
      const index = docs.findIndex(e => e.id == doc.id);
      if (index >= 0) docs[index] = { ...doc.data(), id: doc.id };
      else docs.push({ ...doc.data(), id: doc.id });
      reloads.value++;
    });
  });
  rerender.value++;
  return docs;
}
export async function getGroupUsers(uids: string[]): Promise<type.GroupUser> {
  const docs: QueryDocumentSnapshot<DocumentData>[] = [];
  const querySnapshot = await getDocs(query(collection(getFirestore(), 'users'), where(documentId(), 'in', uids)));
  querySnapshot.forEach(doc => {
    docs.push(doc);
  });
  return docs.map(user => ({
    ...(user.data() as type.User),
    id: user.id,
  })) as unknown as type.GroupUser;
}

export async function joinGroup(groupId: string, userId: string) {
  await updateDoc(doc(getFirestore(), 'groups', groupId), { ['users']: arrayUnion(userId) });
  rerender.value++;
}

export async function addGroup(group: type.Group) {
  return (await addAPI('groups', group)).id;
}

export async function searchGroup(groupName: string) {
  const docs: QueryDocumentSnapshot<DocumentData>[] = [];
  const querySnapshot = await getDocs(query(collection(getFirestore(), 'groups'), where('name', '==', groupName), where('isPublic', '==', true)));
  querySnapshot.forEach(doc => {
    docs.push(doc);
  });
  return docs.map(group => ({
    ...(group.data() as type.User),
    id: group.id,
  })) as unknown as type.Group;
}

export async function addTask(groupId: string, taskId: string, task: type.Task) {
  await updateDoc(doc(getFirestore(), 'groups', groupId), {
    [`tasks.${taskId}`]: task,
  });
  rerender.value++;
}
export async function deleteTask(groupId: string, taskId: string) {
  await updateDoc(doc(getFirestore(), 'groups', groupId), {
    [`tasks.${taskId}`]: deleteField(),
  });
  rerender.value++;
}

export async function addShoppingItem(groupId: string, ShoppingKey: string, ShoppingItem: type.ShoppingItem) {
  await updateDoc(doc(getFirestore(), 'groups', groupId), {
    [`shoppingList.shoppingItems.${ShoppingKey}`]: ShoppingItem,
  });
  rerender.value++;
}
export async function deleteShoppingItem(groupId: string, shoppingItem: string) {
  await updateDoc(doc(getFirestore(), 'groups', groupId), {
    [`shoppingList.shoppingItems.${shoppingItem}`]: deleteField(),
  });
  rerender.value++;
}
export async function clearShoppingList(groupId: string) {
  await updateDoc(doc(getFirestore(), 'groups', groupId), {
    [`shoppingList`]: {},
  });
  rerender.value++;
}
export function makeRerender() {
  rerender.value++;
}