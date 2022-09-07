import { ChangeEvent, useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase.utils";
import { FormInput } from "../form-input/form-input.component";

import "./sign-up.scss";
import "../button/button-component.scss";
import { Button } from "../button/button-component";

type SignUpForm = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUp = () => {
  const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formFields, setFormFields] = useState<SignUpForm>(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetForm = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password != confirmPassword) return;
    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      if (response) {
        const { user } = response;
        await createUserDocumentFromAuth(user, { displayName });
        resetForm();
      }
    } catch ({ message, code }) {
      if (code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use!");
      }
      console.log("user creation", message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          required
          label="Display Name"
          type="text"
          name="displayName"
          onChange={handleChange}
          value={displayName}
        />
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
        <FormInput
          required
          label="Confirm password"
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};
