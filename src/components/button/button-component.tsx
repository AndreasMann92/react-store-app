import { FC } from "react";
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  LoadingSpinner,
} from "./button.styles";

type ButtonProps = {
  buttonType?: ButtonType;
  isLoading?: boolean;
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

export const Button: FC<ButtonProps> = ({
  buttonType,
  children,
  isLoading = false,
  ...props
}) => {
  const CustomButton: any = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...props}>
      {isLoading ? <LoadingSpinner /> : children}
    </CustomButton>
  );
};
