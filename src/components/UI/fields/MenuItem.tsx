import { MenuItem, MenuItemProps } from "@mui/material";
import React from "react";

const UIMenuItem: React.FC<MenuItemProps> = (props) => {
  return (
    <>
      <MenuItem { ...props } />
    </>
  );
}
export default UIMenuItem;