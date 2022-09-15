import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";
import { Button, ButtonType } from "../button/button-component";
import { FormInput } from "../form-input/form-input.component";
import { Buttons, SignInForm } from "./sign-in.styles.jsx";

type Login = {
  email: string;
  password: string;
};

const loginDefault = {
  email: "",
  password: "",
};

export const SignIn = () => {
  const dispatch = useDispatch();
  const [authFields, setAuthFields] = useState<Login>(loginDefault);
  const { email, password } = authFields;

  const loginGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const loginInternal = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) return;

    try {
      dispatch(emailSignInStart(email, password));
      clearForm();
    } catch ({ message, code }) {
      if (code === "auth/wrong-password") alert("incorrect password for email");
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
    <SignInForm>
      <h2>I already have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={loginInternal}>
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
        <Buttons>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={ButtonType.GOOGLE}
            onClick={loginGoogle}
          >
            Google Sign In
          </Button>
        </Buttons>
      </form>
    </SignInForm>
  );
};
