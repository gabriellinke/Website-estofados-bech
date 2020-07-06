import React from "react";
import { ErrorMessage, Field } from "formik";
import TextField from "@material-ui/core/TextField";

import "./FormikField.css";

interface FormikFieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const FormikField: React.FC<FormikFieldProps> = ({ name, label, type = "text", required = false, className = "", disabled = false}) => {
  return (
    <div className="FormikField">
      <Field
        className={className}
        required={required}
        disabled={disabled}
        autoComplete="off"
        as={TextField}
        label={label}
        name={name}
        fullWidth
        type={type}
        helperText={<ErrorMessage name={name} />}
      />
    </div>
  );
};

export default FormikField;
