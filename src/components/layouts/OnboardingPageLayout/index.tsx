import { FC, HTMLAttributes } from 'react';

import { Illustration, Logo } from '~/assets/icons';

import { Container, MainContent } from './styles';

type Props = HTMLAttributes<HTMLDivElement>;

const OnboardingPageLayout: FC<Props> = ({ children, ...rest }) => (
  <Container {...rest}>
    <aside>
      <Illustration role="img" />
      <h1>Create live Q&amp;A rooms!</h1>
      <p>Answer your audience&apos;s questions in real time.</p>
    </aside>
    <main>
      <MainContent>
        <Logo role="img" aria-label="Letmeask" />
        {children}
      </MainContent>
    </main>
  </Container>
);

export default OnboardingPageLayout;
