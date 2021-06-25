import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, HTMLAttributes, useCallback, useMemo } from 'react';

import { ExitIcon, Logo } from '~/assets/icons';
import { Button } from '~/components/common';
import { RoomCode } from '~/components/rooms';
import { useAuth } from '~/contexts/AuthContext';

import { Container, HeaderSeparator, RoomTitle } from './styles';

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
  const { signOut } = useAuth();

  const router = useRouter();

  const questionsLeftLabel = useMemo(() => {
    if (numberOfQuestions === 0) return null;
    const shouldUsePlural = numberOfQuestions > 1;
    return `${numberOfQuestions} question${shouldUsePlural ? 's' : ''}`;
  }, [numberOfQuestions]);

  const handleExitRoom = useCallback(() => router.push('/'), [router]);

  const handleSignOut = useCallback(async () => {
    await signOut();
    router.push('/');
  }, [router, signOut]);

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
              size="small"
              onClick={onCloseRoom}
            >
              Close room
            </Button>
          )}
          {!isAdmin && (
            <Button
              type="button"
              variant="outline"
              size="small"
              icon={<ExitIcon />}
              onClick={handleExitRoom}
            >
              Exit room
            </Button>
          )}

          <HeaderSeparator />

          <Button type="button" size="small" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      </header>

      <main>
        <RoomTitle>
          <h1>{roomName}</h1>
          {questionsLeftLabel && <span>{questionsLeftLabel}</span>}
        </RoomTitle>

        {children}
      </main>
    </Container>
  );
};

export default RoomPageLayout;
