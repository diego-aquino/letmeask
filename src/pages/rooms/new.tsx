import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { Button, Input } from '~/components/common';
import { useAuth } from '~/contexts/AuthContext';
import { Container } from '~/styles/pages/NewRoomPage';

const NewRoomPage: FC = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!user && !isLoading) {
      router.replace('/');
    }
  }, [user, isLoading, router]);

  if (!user && isLoading) {
    return null;
  }

  return (
    <Container>
      <Head>
        <title>Letmeask</title>
      </Head>

      <h2>Create a new room</h2>
      <form>
        <Input type="text" id="roomName" label="Room name" />
        <Button type="submit">Create room</Button>
      </form>
      <p>
        Want to join an existing room?&nbsp;
        <Link href="/">Click here</Link>
      </p>
    </Container>
  );
};

export default NewRoomPage;
