import Head from 'next/head';
import Link from 'next/link';
import { FC, HTMLAttributes, useMemo } from 'react';

import { Logo } from '~/assets/icons';
import { Button } from '~/components/common';
import { RoomCode } from '~/components/rooms';

import { Container, RoomHead } from './styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  roomName: string;
  roomCode: string;
  numberOfQuestions?: number;
  admin?: boolean;
  onCloseRoom?: () => unknown;
}

const RoomPageLayout: FC<Props> = ({
  roomName,
  roomCode,
  numberOfQuestions = 0,
  admin: isAdmin,
  onCloseRoom,
  children,
  ...rest
}) => {
  const questionsLeftLabel = useMemo(() => {
    if (numberOfQuestions === 0) return null;
    const shouldUsePlural = numberOfQuestions > 1;
    return `${numberOfQuestions} question${shouldUsePlural ? 's' : ''}`;
  }, [numberOfQuestions]);

  return (
    <Container {...rest}>
      <Head>
        <title>{roomName ? `${roomName} | Letmeask` : 'Letmeask'}</title>
      </Head>

      <header>
        <Link href="/">
          <a>
            <Logo role="img" aria-label="Letmeask" />
          </a>
        </Link>

        <div>
          <RoomCode code={roomCode} />

          {isAdmin && (
            <Button
              type="button"
              variant="outline-danger"
              onClick={onCloseRoom}
            >
              Encerrar sala
            </Button>
          )}
        </div>
      </header>

      <main>
        <RoomHead>
          <h1>Sala {roomName}</h1>
          {questionsLeftLabel && <span>{questionsLeftLabel}</span>}
        </RoomHead>

        {children}
      </main>
    </Container>
  );
};

export default RoomPageLayout;
