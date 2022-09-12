import { ChangeEvent, FC } from "react";

import { FormGroup, FormInputLabel, Input } from "./form-input.styles";

type FormInputProps = {
  required: boolean;
  type: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const FormInput: FC<FormInputProps> = ({ label, ...props }) => {
  return (
    <FormGroup>
      <Input {...props} />
      {label && (
        <FormInputLabel shrink={!!props.value.length}>{label}</FormInputLabel>
      )}
    </FormGroup>
  );
};
