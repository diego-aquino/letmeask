import { FC, useState } from 'react';

import { useMount } from '~/hooks';

import {
  Container,
  IconWrapper,
  Code,
  CopyIcon,
  BareCheckIcon,
} from './styles';

interface Props {
  code: string;
}

const RoomCode: FC<Props> = ({ code }) => {
  const [iconName, setIconName] = useState<'copy' | 'check'>('copy');
  const isMounted = useMount();

  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(code);

    setIconName('check');

    setTimeout(() => {
      if (!isMounted.current) return;
      setIconName('copy');
    }, 1500);
  };

  return (
    <Container type="button" onClick={copyRoomCodeToClipboard}>
      <IconWrapper>
        <CopyIcon $active={iconName === 'copy'} />
        <BareCheckIcon $active={iconName === 'check'} />
      </IconWrapper>
      <Code>Room #{code}</Code>
    </Container>
  );
};

export default RoomCode;
