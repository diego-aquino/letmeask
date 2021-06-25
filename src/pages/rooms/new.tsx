import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, FormEvent, useEffect, useRef, useState } from 'react';

import { Button, Input } from '~/components/common';
import { PageWithLoading } from '~/components/layouts';
import { useAuth } from '~/contexts/AuthContext';
import { createRoom } from '~/services/rooms';
import { Container } from '~/styles/pages/NewRoomPage';

const NewRoomPage: FC = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const roomNameRef = useRef<HTMLInputElement>(null);
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(false);

  useEffect(() => {
    if (!user && !isLoading) {
      router.replace('/');
    }
  }, [user, isLoading, router]);

  const handleCreateRoomSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitButtonIsDisabled(true);

    try {
      const roomName = roomNameRef.current?.value.trim();
      if (!roomName || !user) return;

      const roomDoc = await createRoom({
        name: roomName,
        ownerId: user.id,
        isActive: true,
      });
      router.push(`/admin/rooms/${roomDoc.id}`);
    } finally {
      setSubmitButtonIsDisabled(false);
    }
  };

  const isReady = !isLoading && user;

  return (
    <PageWithLoading loading={!isReady}>
      <Container>
        <Head>
          <title>Letmeask</title>
        </Head>

        <h2>Create a new room</h2>
        <form onSubmit={handleCreateRoomSubmit}>
          <Input
            ref={roomNameRef}
            type="text"
            id="roomName"
            label="Room name"
            autoComplete="off"
          />
          <Button type="submit" disabled={submitButtonIsDisabled}>
            Create room
          </Button>
        </form>
        <p>
          Want to join an existing room?&nbsp;
          <Link href="/">Click here</Link>
        </p>
      </Container>
    </PageWithLoading>
  );
};

export default NewRoomPage;
