import { Select, SelectProps } from "@mui/material";
import React from "react";

const UISelect: React.FC<SelectProps> = ({ children, ...props}) => {
  return (
    <>
      <Select { ...props }>{children}</Select>
    </>
  );
}
export default UISelect;