import { InputLabel, InputLabelProps } from "@mui/material";
import React from "react";

const UIInputLabel: React.FC<InputLabelProps> = (props) => {
  return (
    <>
      <InputLabel { ...props } />
    </>
  );
}
export default UIInputLabel;
