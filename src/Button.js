// Button.js
import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ onClick, children, className, variant = 'contained', color = 'primary' }) => {
  return (
    <MuiButton onClick={onClick} className={className} variant={variant} color={color}>
      {children}
    </MuiButton>
  );
};

export default Button;
