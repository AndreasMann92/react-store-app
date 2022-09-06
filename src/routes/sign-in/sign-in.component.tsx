import { SignUp } from "../../components/sign-up/sign-up.component";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase.utils";

export const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  return (
    <>
      <h1>Sign-In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUp />
    </>
  );
};
