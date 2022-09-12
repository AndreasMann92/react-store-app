import { FC } from "react";
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles";

type ButtonProps = {
  buttonType?: ButtonType;
} & JSX.IntrinsicElements["button"];

export enum ButtonType {
  BASE = "base",
  GOOGLE = "google-sign-in",
  INVERTED = "inverted",
}

const getButton = (buttonType: ButtonType = ButtonType.BASE) =>
  ({
    [ButtonType.BASE]: BaseButton,
    [ButtonType.GOOGLE]: GoogleSignInButton,
    [ButtonType.INVERTED]: InvertedButton,
  }[buttonType]);

export const Button: FC<ButtonProps> = ({ buttonType, children, ...props }) => {
  const CustomButton: any = getButton(buttonType);
  return <CustomButton {...props}>{children}</CustomButton>;
};
