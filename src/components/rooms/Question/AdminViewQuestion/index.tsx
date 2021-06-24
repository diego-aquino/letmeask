import { FC } from 'react';

import { DeleteIcon, LikeIcon } from '~/assets/icons';
import { UserInfo } from '~/components/common';
import { Question } from '~/services/questions';

import { Container, QuestionControls, Likes, DeleteButton } from '../styles';

export interface Props {
  question: Question;
  onToggleQuestionAnswered?: (questionId: string, isAnswered: boolean) => void;
  onToggleAnsweringQuestion?: (
    questionId: string,
    isAnswering: boolean,
  ) => void;
  onRemoveQuestion?: (questionId: string) => void;
}

const AdminViewQuestion: FC<Props> = ({ question, onRemoveQuestion }) => {
  const handleRemoveQuestion = () => {
    onRemoveQuestion?.(question.id);
  };

  return (
    <Container>
      <p>{question.content}</p>
      <footer>
        <UserInfo
          name={question.author.name ?? ''}
          photoURL={question.author.photoURL}
          boldName={false}
        />
        <QuestionControls>
          <Likes>
            <LikeIcon role="img" aria-label="Like icon" />
            {question.numberOfLikes}
          </Likes>

          <DeleteButton
            type="button"
            aria-label="Remove question"
            onClick={handleRemoveQuestion}
          >
            <DeleteIcon role="img" aria-label="Trash icon" />
          </DeleteButton>
        </QuestionControls>
      </footer>
    </Container>
  );
};

export default AdminViewQuestion;
