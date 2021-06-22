import { InputHTMLAttributes, FC } from 'react';

import { Container } from './styles';

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input: FC<Props> = ({ ...rest }) => <Container {...rest} />;

export default Input;
