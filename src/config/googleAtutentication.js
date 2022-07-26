import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = { user: result.user.displayName, 
        email: result.user.email, 
        photoURL: result.user.photoURL,
        uid: result.user.uid,
        provider: result.user.providerId,
        isAuthenticated: true
     };
    console.log(user);
    return user;
};

export { signInWithGoogle };
