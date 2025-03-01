import { FC } from "react";

interface FormFieldErrorProps {
  error?: string;
  alignCenter?: boolean;
}

const FormFieldError: FC<FormFieldErrorProps> = ({ error, alignCenter }) => {
  return (
    <div className={`form-field-error ${alignCenter && "text-center"}`}>
      {error}
    </div>
  );
};

export default FormFieldError;
