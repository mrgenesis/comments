
import { Box, BoxProps } from '@mui/material';
import React from 'react';

const UIBox: React.FC<BoxProps> = ({ ...props }) => <Box { ...props } />

export default UIBox;
