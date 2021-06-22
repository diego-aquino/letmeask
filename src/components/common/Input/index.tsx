import { InputHTMLAttributes, FC, useRef, FocusEvent, useState } from 'react';

import { Container } from './styles';

type Props = InputHTMLAttributes<HTMLInputElement> &
  ({ id: string; label: string } | { id?: string; label?: never });

const Input: FC<Props> = ({ id, label, placeholder, onBlur, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [keepLabelOutside, setKeepLabelOutside] = useState(false);

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setKeepLabelOutside(!!inputRef.current?.value);
    onBlur?.(event);
  };

  return (
    <Container keepLabelOutside={keepLabelOutside}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        ref={inputRef}
        id={id}
        onBlur={handleBlur}
        placeholder={placeholder ?? label}
        {...rest}
      />
    </Container>
  );
};

export default Input;
