import { FC, useReducer } from 'react';

import { LikeIcon } from '~/assets/icons';
import { UserInfo } from '~/components/common';
import { Question } from '~/services/questions';

import {
  Container,
  LikesContainer,
  QuestionControls,
  ControlButton,
} from '../styles';

export interface Props {
  question: Question;
  initialHasLike?: boolean;
  onToggleQuestionLike?: (questionId: string, hasLike: boolean) => void;
}

const GuestViewQuestion: FC<Props> = ({
  question,
  initialHasLike = false,
  onToggleQuestionLike,
}) => {
  const [hasLike, toggleHasLike] = useReducer(
    (likedState: boolean) => !likedState,
    initialHasLike,
  );

  const handleToggleQuestionLike = () => {
    onToggleQuestionLike?.(question.id, !hasLike);
    toggleHasLike();
  };

  return (
    <Container
      answered={question.isAnswered}
      highlighted={question.isHighlighted}
    >
      <p>{question.content}</p>
      <footer>
        <UserInfo
          name={question.author.name ?? ''}
          photoURL={question.author.photoURL}
        />
        <QuestionControls>
          {!question.isAnswered && (
            <ControlButton
              type="button"
              aria-label="Like question"
              onClick={handleToggleQuestionLike}
              highlighted={hasLike}
            >
              <LikesContainer>
                <LikeIcon role="img" aria-label="Like icon" />{' '}
                {question.numberOfLikes}
              </LikesContainer>
            </ControlButton>
          )}
        </QuestionControls>
      </footer>
    </Container>
  );
};

export default GuestViewQuestion;
