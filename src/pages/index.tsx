import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { Button, Input } from '~/components/common';
import { useAuth } from '~/contexts/AuthContext';
import { Container, Separator } from '~/styles/pages/HomePage';

const googleIcon = <img src="/google-icon.svg" alt="Google logo" />;

const HomePage: FC = () => {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();

  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }
    router.push('/rooms/new');
  };

  return (
    <Container>
      <Head>
        <title>Letmeask</title>
      </Head>

      <Button
        type="button"
        variant="outline"
        icon={googleIcon}
        onClick={handleCreateRoom}
      >
        Create a room with Google
      </Button>

      <Separator>
        <span>or join a room</span>
      </Separator>

      <form>
        <Input
          type="text"
          id="roomCodeInput"
          label="Enter the code of the room"
        />
        <Button type="submit">Join room</Button>
      </form>
    </Container>
  );
};

export default HomePage;
