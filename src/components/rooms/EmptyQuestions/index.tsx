import { FC } from 'react';

import { EmptyQuestionsImage } from '~/assets/icons';

import { Container } from './styles';

interface Props {
  adminView: boolean;
}

const EmptyQuestions: FC<Props> = ({ adminView }) => (
  <Container>
    <EmptyQuestionsImage />
    <h3>There are no questions...</h3>
    <p>
      {adminView
        ? 'Share the code of this room and start answering questions!'
        : 'Be the first to ask one!'}
    </p>
  </Container>
);

export default EmptyQuestions;
