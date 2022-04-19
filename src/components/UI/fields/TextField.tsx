import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

const UITextField: React.FC<TextFieldProps> = ({ ...props }) => {
  return (
    <TextField { ...props } />
  );
}
export default UITextField;
