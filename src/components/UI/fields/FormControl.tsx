import { FormControl, FormControlProps } from "@mui/material";
import React from "react";

const UIFormControl: React.FC<FormControlProps> = ({ children, ...props}) => {
  return (
    <>
      <FormControl sx={{ m: 1 }} { ...props }>{children}</FormControl>
    </>
  );
}
export default UIFormControl;