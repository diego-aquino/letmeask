import { FC, useEffect, useReducer, useState } from 'react';

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
  const [numberOfLikes, setNumberOfLikes] = useState(question.numberOfLikes);

  useEffect(() => {
    setNumberOfLikes(question.numberOfLikes);
  }, [question.numberOfLikes]);

  const [hasLike, toggleHasLike] = useReducer(
    (likedState: boolean) => !likedState,
    initialHasLike,
  );

  const handleToggleQuestionLike = () => {
    setNumberOfLikes((currentLikes) => {
      const likeWasAdded = !hasLike;
      return likeWasAdded ? currentLikes + 1 : currentLikes - 1;
    });

    onToggleQuestionLike?.(question.id, !hasLike);
    toggleHasLike();
  };

  const likeButtonLabel = hasLike ? 'Remove like' : 'Like question';

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
              title={likeButtonLabel}
              aria-label={likeButtonLabel}
              onClick={handleToggleQuestionLike}
              highlighted={hasLike}
            >
              <LikesContainer>
                <LikeIcon role="img" aria-label="Like icon" /> {numberOfLikes}
              </LikesContainer>
            </ControlButton>
          )}
        </QuestionControls>
      </footer>
    </Container>
  );
};

export default GuestViewQuestion;
