import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import { ButtonVariant, ButtonSize, Container, IconWrapper } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
}

const Button: FC<Props> = ({
  variant = 'primary',
  size = 'normal',
  icon,
  children,
  ...rest
}) => (
  <Container type="button" variant={variant} size={size} {...rest}>
    {icon && <IconWrapper>{icon}</IconWrapper>}
    {children}
  </Container>
);

export default Button;
