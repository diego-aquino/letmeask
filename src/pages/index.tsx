import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, FormEvent, useRef, useState } from 'react';

import { EnterIcon, GoogleIcon } from '~/assets/icons';
import { Button, Input } from '~/components/common';
import { useAuth } from '~/contexts/AuthContext';
import { getRoomSnapshot } from '~/services/rooms';
import { Container, Separator } from '~/styles/pages/HomePage';
import { notify } from '~/utils';

const HomePage: FC = () => {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();

  const roomCodeRef = useRef<HTMLInputElement>(null);
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(false);

  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }
    router.push('/rooms/new');
  };

  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitButtonIsDisabled(true);

    try {
      const roomCode = roomCodeRef.current?.value.trim();
      if (!roomCode || !user) return;

      const roomSnapshot = await getRoomSnapshot(roomCode);

      if (!roomSnapshot.exists) {
        notify.error('Room not found');
        return;
      }

      const room = roomSnapshot.data();
      if (!room?.isActive) {
        notify.error('This room is no longer active');
        return;
      }

      router.push(`/rooms/${roomCode}`);
    } finally {
      setSubmitButtonIsDisabled(false);
    }
  };

  return (
    <Container>
      <Head>
        <title>Letmeask</title>
      </Head>

      <Button
        type="button"
        variant="outline-gray"
        icon={<GoogleIcon role="img" aria-label="Google logo" />}
        onClick={handleCreateRoom}
      >
        Create a room with Google
      </Button>

      <Separator>
        <span>or join a room</span>
      </Separator>

      <form onSubmit={handleJoinRoom}>
        <Input
          ref={roomCodeRef}
          type="text"
          id="roomCodeInput"
          label="Enter the code of the room"
          autoComplete="off"
        />
        <Button
          type="submit"
          icon={<EnterIcon />}
          disabled={submitButtonIsDisabled}
        >
          Join room
        </Button>
      </form>
    </Container>
  );
};

export default HomePage;
