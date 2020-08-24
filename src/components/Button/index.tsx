import React, { FC, ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, ...props }) => (
  <Container type="button" {...props}>
    {children}
  </Container>
);

export default Button;
