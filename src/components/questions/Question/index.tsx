import { FC } from 'react';

import { UserInfo } from '~/components/common';

import { Container } from './styles';

interface Props {
  content: string;
  authorName: string;
  authorPhotoURL?: string | null;
}

const Question: FC<Props> = ({ content, authorName, authorPhotoURL }) => (
  <Container>
    <p>{content}</p>
    <footer>
      <UserInfo name={authorName} photoURL={authorPhotoURL} boldName={false} />
    </footer>
  </Container>
);

export default Question;
