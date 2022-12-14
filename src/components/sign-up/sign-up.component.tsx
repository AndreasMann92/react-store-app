import { ChangeEvent, useState } from "react";
import { FormInput } from "../form-input/form-input.component";

import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
import { Button } from "../button/button-component";
import "../button/button.styles";
import { SignUpForm } from "./sign-up.styles";

type SignUpFormType = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUp = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] =
    useState<SignUpFormType>(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetForm = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) return;
    try {
      dispatch(signUpStart({ email, password, displayName }));
      resetForm();
    } catch ({ message, code }) {
      if (code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use!");
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpForm>
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
    </SignUpForm>
  );
};
