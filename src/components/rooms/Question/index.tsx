import { FC, useReducer } from 'react';

import { DeleteIcon, LikeIcon } from '~/assets/icons';
import { UserInfo } from '~/components/common';

import {
  Container,
  QuestionControls,
  DeleteButton,
  LikeButton,
} from './styles';

type Props = {
  id: string;
  content: string;
  authorName: string;
  authorPhotoURL?: string | null;
} & (
  | {
      adminView: true;
      onToggleQuestionAnswered?: (
        questionId: string,
        isAnswered: boolean,
      ) => void;
      onToggleAnsweringQuestion?: (
        questionId: string,
        isAnswering: boolean,
      ) => void;
      onRemoveQuestion?: (questionId: string) => void;
    }
  | {
      adminView: false;
      numberOfLikes: number;
      defaultHasLike?: boolean;
      onToggleQuestionLike?: (questionId: string, hasLike: boolean) => void;
    }
);

const Question: FC<Props> = ({
  id,
  content,
  authorName,
  authorPhotoURL,
  ...props
}) => {
  const [hasLike, toggleHasLike] = useReducer(
    (likedState: boolean) => !likedState,
    (!props.adminView && props.defaultHasLike) ?? false,
  );

  const handleRemoveQuestion = () => {
    if (props.adminView) {
      props.onRemoveQuestion?.(id);
    }
  };

  const handleToggleQuestionLike = () => {
    toggleHasLike();
    if (!props.adminView) {
      props.onToggleQuestionLike?.(id, !hasLike);
    }
  };

  return (
    <Container>
      <p>{content}</p>
      <footer>
        <UserInfo
          name={authorName}
          photoURL={authorPhotoURL}
          boldName={false}
        />
        <QuestionControls>
          {props.adminView ? (
            <DeleteButton
              type="button"
              aria-label="Remove question"
              onClick={handleRemoveQuestion}
            >
              <DeleteIcon role="img" aria-label="Remove icon" />
            </DeleteButton>
          ) : (
            <LikeButton
              type="button"
              aria-label="Like question"
              onClick={handleToggleQuestionLike}
              hasLike={hasLike}
            >
              <LikeIcon role="img" aria-label="Like icon" />{' '}
              {props.numberOfLikes}
            </LikeButton>
          )}
        </QuestionControls>
      </footer>
    </Container>
  );
};

export default Question;
