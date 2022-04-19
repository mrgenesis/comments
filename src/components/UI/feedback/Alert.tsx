
import { Alert, AlertProps } from '@mui/material';
import React from 'react';

const UIAlert: React.FC<AlertProps> = ({ ...props }) => <Alert { ...props } />

export default UIAlert;
