import { getApp, getApps, initializeApp } from 'firebase/app';
import {
    Auth,
    GoogleAuthProvider,
    OAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    initializeAuth,
    signInWithCredential,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyAykgo136ZREzKUXO5qchTq0DXTNVTMxhc',
    authDomain: 'audio-bible-44698.firebaseapp.com',
    projectId: 'audio-bible-44698',
    storageBucket: 'audio-bible-44698.firebasestorage.app',
    messagingSenderId: '108270401177',
    appId: '1:108270401177:ios:6e43384116dc22878bea08',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let auth: Auth;
try {
    auth = initializeAuth(app);
} catch {
    auth = getAuth(app);
}

export { auth };

export async function registerWithEmail(name: string, email: string, password: string) {
    const result = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
    await updateProfile(result.user, { displayName: name.trim() });
    return result.user;
}

export async function loginWithEmail(email: string, password: string) {
    const result = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
    return result.user;
}

export async function loginWithGoogle(idToken: string) {
    return (await signInWithCredential(auth, GoogleAuthProvider.credential(idToken))).user;
}

export async function loginWithApple(identityToken: string, rawNonce?: string) {
    const provider = new OAuthProvider('apple.com');
    return (await signInWithCredential(auth, provider.credential({ idToken: identityToken, rawNonce }))).user;
}
