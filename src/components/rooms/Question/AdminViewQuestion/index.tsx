import { FC } from 'react';

import { AnswerIcon, CheckIcon, DeleteIcon, LikeIcon } from '~/assets/icons';
import { UserInfo } from '~/components/common';
import { useToggle } from '~/hooks';
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
  const [isAnswered, toggleIsAnswered] = useToggle(initialIsAnswered);
  const [isHighlighted, toggleIsHighlighted] = useToggle(initialIsHighlighted);

  const handleRemoveQuestion = () => {
    onRemoveQuestion?.(question.id);
  };

  const handleHighlightQuestion = () => {
    onHighlightQuestion?.(question.id, !isAnswered);
    toggleIsHighlighted();
  };

  const handleAnswerQuestion = () => {
    onAnswerQuestion?.(question.id, !isAnswered);
    toggleIsAnswered();
    toggleIsHighlighted(false);
  };

  const checkButtonLabel = isAnswered
    ? 'Mark question as not answered'
    : 'Mark question as answered';

  const highlightButtonLabel = isHighlighted
    ? 'Remove highlight'
    : 'Highlight question';

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
            title={checkButtonLabel}
            aria-label={checkButtonLabel}
            highlighted={isAnswered}
            onClick={handleAnswerQuestion}
          >
            <CheckIcon role="img" aria-label="Check icon" />
          </ControlButton>

          <ControlButton
            type="button"
            title={highlightButtonLabel}
            aria-label={highlightButtonLabel}
            highlighted={isHighlighted}
            onClick={handleHighlightQuestion}
            disabled={isAnswered}
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
