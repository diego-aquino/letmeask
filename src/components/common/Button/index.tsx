import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import { ButtonVariant, Container, IconWrapper } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
}

const Button: FC<Props> = ({
  variant = 'primary',
  icon,
  children,
  ...rest
}) => (
  <Container type="button" variant={variant} {...rest}>
    {icon && <IconWrapper>{icon}</IconWrapper>}
    {children}
  </Container>
);

export default Button;
