import { FC, useReducer } from 'react';

import { LikeIcon } from '~/assets/icons';
import { UserInfo } from '~/components/common';
import { Question } from '~/services/questions';

import { Container, Likes, QuestionControls } from '../styles';
import { LikeButton } from './styles';

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
    <Container>
      <p>{question.content}</p>
      <footer>
        <UserInfo
          name={question.author.name ?? ''}
          photoURL={question.author.photoURL}
          boldName={false}
        />
        <QuestionControls>
          <LikeButton
            type="button"
            aria-label="Like question"
            onClick={handleToggleQuestionLike}
            hasLike={hasLike}
          >
            <Likes>
              <LikeIcon role="img" aria-label="Like icon" />{' '}
              {question.numberOfLikes}
            </Likes>
          </LikeButton>
        </QuestionControls>
      </footer>
    </Container>
  );
};

export default GuestViewQuestion;
