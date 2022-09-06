import { ChangeEvent, FC } from "react";

import "./form-input.scss";

type FormInputProps = {
  required: boolean;
  type: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const FormInput: FC<FormInputProps> = ({ label, ...other }) => {
  return (
    <div className="form-group">
      <input className="form-input" {...other} />
      {label && (
        <label className={`${other.value.length ? "shrink" : ""} form-label`}>
          {label}
        </label>
      )}
    </div>
  );
};
