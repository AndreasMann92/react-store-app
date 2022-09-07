import { FC, PropsWithChildren } from "react";

type ButtonProps = {
  buttonType?: string;
} & JSX.IntrinsicElements["button"];

const BUTTON_TYPES_CLASSES: { [key: string]: string } = {
  google: "google-sign-in",
  inverted: "inverted",
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  buttonType,
  children,
  ...props
}) => {
  return (
    <button
      className={`button-container ${
        buttonType ? BUTTON_TYPES_CLASSES[buttonType] : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
