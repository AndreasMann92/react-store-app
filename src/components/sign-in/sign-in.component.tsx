import { ChangeEvent, useState } from "react";
import { Button } from "../button/button-component";
import { FormInput } from "../form-input/form-input.component";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signIn,
} from "../../utils/firebase.utils";

import "./sign-in.scss";

type Login = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const loginDefault = {
    email: "",
    password: "",
  };

  const [authFields, setAuthFields] = useState<Login>(loginDefault);
  const { email, password } = authFields;

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const logInternal = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) return;

    try {
      const { user } = await signIn(email, password);
      if (user) {
        await createUserDocumentFromAuth(user);
        clearForm();
      }
    } catch ({ message, code }) {
      if (code === "auth/wrong-password") alert("incorrect password for email");
      console.log("login error", message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAuthFields({ ...authFields, [name]: value });
  };

  const clearForm = () => {
    setAuthFields({ ...loginDefault });
  };

  return (
    <div className="sign-in-form">
      <h2>I already have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={logInternal}>
        <FormInput
          required
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
        />
        <FormInput
          required
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
        />
        <div className="buttons">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={logGoogleUser}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};
