import { SignUp } from "../../components/sign-up/sign-up.component";
import { SignIn } from "../sign-in/sign-in.component";

import "./auth.scss";

export const Authentication = () => {
  return (
    <div className="auth-container">
      <SignIn />
      <SignUp />
    </div>
  );
};
