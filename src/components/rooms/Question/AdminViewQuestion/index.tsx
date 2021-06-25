import { FC, useReducer } from 'react';

import { AnswerIcon, CheckIcon, DeleteIcon, LikeIcon } from '~/assets/icons';
import { UserInfo } from '~/components/common';
import { Question } from '~/services/questions';

import {
  Container,
  QuestionControls,
  LikesContainer,
  DeleteButton,
  ControlButton,
} from '../styles';

export interface Props {
  question: Question;
  initialIsAnswered?: boolean;
  initialIsHighlighted?: boolean;
  onAnswerQuestion?: (questionId: string, isAnswered: boolean) => void;
  onHighlightQuestion?: (questionId: string, isHighlighted: boolean) => void;
  onRemoveQuestion?: (questionId: string) => void;
}

const AdminViewQuestion: FC<Props> = ({
  question,
  initialIsAnswered = false,
  initialIsHighlighted = false,
  onAnswerQuestion,
  onHighlightQuestion,
  onRemoveQuestion,
}) => {
  const [isAnswered, toggleIsAnswered] = useReducer(
    (answeredState: boolean) => !answeredState,
    initialIsAnswered,
  );
  const [isHighlighted, toggleIsHighlighted] = useReducer(
    (highlightedState: boolean) => !highlightedState,
    initialIsHighlighted,
  );

  const handleRemoveQuestion = () => {
    onRemoveQuestion?.(question.id);
  };

  const handleAnswerQuestion = () => {
    onAnswerQuestion?.(question.id, !isAnswered);
    toggleIsAnswered();
  };

  const handleHighlightQuestion = () => {
    onHighlightQuestion?.(question.id, !isAnswered);
    toggleIsHighlighted();
  };

  return (
    <Container answered={isAnswered} highlighted={isHighlighted}>
      <p>{question.content}</p>
      <footer>
        <UserInfo
          name={question.author.name ?? ''}
          photoURL={question.author.photoURL}
        />
        <QuestionControls>
          <LikesContainer>
            <LikeIcon role="img" aria-label="Like icon" />
            {question.numberOfLikes}
          </LikesContainer>

          <ControlButton
            type="button"
            title="Mark question as answered"
            aria-label="Mark question as answered"
            highlighted={isAnswered}
            onClick={handleAnswerQuestion}
          >
            <CheckIcon role="img" aria-label="Check icon" />
          </ControlButton>

          <ControlButton
            type="button"
            title="Highlight question"
            aria-label="Highlight question"
            highlighted={isHighlighted}
            onClick={handleHighlightQuestion}
          >
            <AnswerIcon role="img" aria-label="Comment icon" />
          </ControlButton>

          <DeleteButton
            type="button"
            title="Remove question"
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
