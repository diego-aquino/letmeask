import { FC, HTMLAttributes } from 'react';

import { Illustration } from '~/assets/icons';

import { Container, MainContent } from './styles';

type Props = HTMLAttributes<HTMLDivElement>;

const CoverPage: FC<Props> = ({ children, ...rest }) => (
  <Container {...rest}>
    <aside>
      <Illustration role="img" />
      <h1>Create live Q&amp;A rooms!</h1>
      <p>Answer your audience&apos;s questions in real time.</p>
    </aside>
    <main>
      <MainContent>
        <img src="/logo.svg" alt="Letmeask" />
        {children}
      </MainContent>
    </main>
  </Container>
);

export default CoverPage;
