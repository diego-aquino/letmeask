import { FC } from 'react';

import { CopyIcon } from '~/assets/icons';

import { Container, CopyIconWrapper, Code } from './styles';

interface Props {
  code: string;
}

const RoomCode: FC<Props> = ({ code }) => {
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Container type="button" onClick={copyRoomCodeToClipboard}>
      <CopyIconWrapper>
        <CopyIcon />
      </CopyIconWrapper>
      <Code>Room #{code}</Code>
    </Container>
  );
};

export default RoomCode;
