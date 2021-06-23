import {
  InputHTMLAttributes,
  useRef,
  FocusEvent,
  useState,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react';

import { mergeRefs } from '~/utils';

import { Container } from './styles';

type Props = InputHTMLAttributes<HTMLInputElement> &
  ({ id: string; label: string } | { id?: string; label?: never });

const Input: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { id, label, placeholder, onBlur, ...rest },
  ref,
) => {
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
        ref={mergeRefs(inputRef, ref)}
        id={id}
        onBlur={handleBlur}
        placeholder={placeholder ?? label}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
