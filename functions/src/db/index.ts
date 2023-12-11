import { addDoc, getDocs, getFirestore, where, doc, QueryDocumentSnapshot, DocumentData, deleteDoc } from "firebase/firestore";
import { collection, query } from 'firebase/firestore';
import { CalcHistory, User } from "../utils/types";
import { firebaseApp } from "../config/firebase";

const db = getFirestore(firebaseApp);

export const getHistoryByEmail = async (email: string) => {
    const q = query(collection(db, "users"), where("email", "==", email));

    const querySnamshot = await getDocs(q);
    const result: any = [];
    const snapshotIterator: QueryDocumentSnapshot<DocumentData>[] = [];
    querySnamshot.forEach((userDoc) => {
        snapshotIterator.push(userDoc);
    });
    await Promise.all(snapshotIterator.map(async (userDoc) => {
        const userId = userDoc.id;
        const userRef = doc(db, 'users', userId);

        const calcHistoryCollectionRef = collection(userRef, 'calcHistory');
        const calcHistoryQuerySnapshot = await getDocs(calcHistoryCollectionRef);

        calcHistoryQuerySnapshot.forEach((calcDoc) => {
            const historyData = calcDoc.data();
            const historyId = calcDoc.id;
            result.push({...historyData, id: historyId});
        });
    }))

    return result;
}

export const createUser = async (userData: User) => {
    const { email, createdAt, firstName, lastName } = userData;

    const q = query(collection(db, "users"), where("email", "==", email));
    const users = await getDocs(q);

    if(users.size > 0) {
        let userId = '';
        users.forEach((data) => {
            userId = data.id;
        })

        return userId;
    }

    const userRef = await addDoc(collection(db, "users"), {
        email,
        createdAt,
        firstName,
        lastName
    });

    const userId = userRef.id;
    return userId;
}

export const addHistory = async (userEmail: string, historyData: CalcHistory) => {
    const userQuery = query(collection(db, 'users'), where('email', '==', userEmail));
    const querySnapshot = await getDocs(userQuery);
    if (querySnapshot.size > 0) {
        querySnapshot.forEach(async (userDoc) => {
            const userId = userDoc.id
            const userRef = doc(db, 'users', userId);

            const calcHistoryCollectionRef = collection(userRef, 'calcHistory');

            await addDoc(calcHistoryCollectionRef, historyData);
        })
    } else {
        throw new Error('User not found!');
    }
}

export const deleteHistory = async (userEmail: string, historyId: string) => {
    const userQuery = query(collection(db, 'users'), where('email', '==', userEmail));
    const querySnapShot = await getDocs(userQuery);
    if(querySnapShot.size > 0) {
        const snapshotIterator: QueryDocumentSnapshot<DocumentData>[] = [];
        querySnapShot.forEach((userDoc) => {
            snapshotIterator.push(userDoc);
        })

        await Promise.all(snapshotIterator.map(async (userDoc) => {
            const userId = userDoc.id;
            const userRef = doc(db, 'users', userId);

            const calcHistoryCollectionRef = collection(userRef, 'calcHistory');
            const itemDocRef = doc(calcHistoryCollectionRef, historyId);

            await deleteDoc(itemDocRef);
        }));

        return true;
    } else {
        throw new Error('User not found!');
    }
}


export const getUserByEmail = async (userEmail: string) => {
    const userQuery = query(collection(db, 'users'), where('email', '==', userEmail));
    const querySnapShot = await getDocs(userQuery);
    if (querySnapShot.size > 0) {
        let userData: DocumentData = {};
        querySnapShot.forEach((userDoc) => {
            userData = userDoc.data();
        });
        return userData;
    } else {
        throw new Error('User not found!');
    }
} 