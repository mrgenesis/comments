

import { Components, ComponentsProps, Paper, PaperProps } from '@mui/material';
import React from 'react';

const UIPaper: React.FC<PaperProps> = ({ children, ...props }) => {
  return <Paper style={{ padding: '7px 5px 0.1px 5px', margin: 10 }} { ...props }>{children}</Paper>
}

export default UIPaper;