import { FC } from 'react';

import { Illustration } from '~/assets/icons';
import { Button, Input } from '~/components/common';
import { Container, MainContent, Separator } from '~/styles/pages/HomePage';

const googleIcon = <img src="/google-icon.svg" alt="Google logo" />;

const HomePage: FC = () => (
  <Container>
    <aside>
      <Illustration role="img" />
      <h1>Create live Q&amp;A rooms!</h1>
      <p>Answer your audience&apos;s questions in real time.</p>
    </aside>

    <main>
      <MainContent>
        {/* <Logo role="img" aria-label="Letmeask" /> */}
        <img src="/logo.svg" alt="" />

        <Button type="button" variant="outline" icon={googleIcon}>
          Create a room with Google
        </Button>

        <Separator>
          <span>or join a room</span>
        </Separator>

        <form>
          <Input type="text" placeholder="Enter the code of the room" />
          <Button type="submit">Join room</Button>
        </form>
      </MainContent>
    </main>
  </Container>
);

export default HomePage;
