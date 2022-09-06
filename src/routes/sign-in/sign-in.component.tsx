import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase.utils";

export const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const doc = await createUserDocumentFromAuth(user);
    console.log(doc);
  };
  return (
    <>
      <h1>Sign-In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </>
  );
};
