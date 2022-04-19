import { Chip, ChipProps } from "@mui/material";
import React from "react";

const UIChip: React.FC<ChipProps> = ({ ...props }) => <Chip { ...props } />

export default UIChip;
