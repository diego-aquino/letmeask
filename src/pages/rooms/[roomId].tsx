import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react';

import { Button, UserInfo } from '~/components/common';
import { PageWithLoading, RoomPageLayout } from '~/components/layouts';
import { EmptyQuestions, Question } from '~/components/rooms';
import { useAuth } from '~/contexts/AuthContext';
import { useRoom, useQuestions } from '~/hooks';
import { createQuestion, setQuestionLike } from '~/services/questions';
import {
  NewQuestionForm,
  NewQuestionFormFooter,
  QuestionList,
} from '~/styles/pages/GuestRoomPage';
import { notify } from '~/utils';

interface PageQuery extends ParsedUrlQuery {
  roomId: string;
}

const GuestRoomPage: FC = () => {
  const router = useRouter();
  const { roomId } = router.query as PageQuery;

  const { user, isLoading: isLoadingUser, signInWithGoogle } = useAuth();
  const { room, isLoading: isLoadingRoom } = useRoom(roomId);
  const { questions, isLoading: isLoadingQuestions } = useQuestions(
    roomId,
    user?.id ?? null,
  );

  const questionContentRef = useRef<HTMLTextAreaElement>(null);
  const [isCreatingQuestion, setIsSendingQuestion] = useState(false);

  const handleCreateQuestion = async (event: FormEvent) => {
    event.preventDefault();

    const questionContent = questionContentRef.current?.value.trim();
    if (!questionContent) return;

    setIsSendingQuestion(true);

    try {
      const signedInUser = user ?? (await signInWithGoogle());

      if (questionContentRef.current) {
        questionContentRef.current.value = '';
      }

      const question = {
        content: questionContent,
        author: {
          id: signedInUser.id,
          name: signedInUser.name,
          photoURL: signedInUser.photoURL,
        },
        isHighlighted: false,
        isAnswered: false,
      };

      await createQuestion(question, roomId);
      notify.success('Question asked');
    } finally {
      setIsSendingQuestion(false);
    }
  };

  const handleToggleQuestionLike = useCallback(
    async (questionId: string, hasLike: boolean) => {
      if (!user) return;
      await setQuestionLike({
        userId: user.id,
        roomId,
        questionId,
        newLikeState: hasLike,
      });
    },
    [roomId, user],
  );

  useEffect(() => {
    if (!isLoadingRoom && !room?.isActive) {
      router.replace('/');
    }
  }, [isLoadingRoom, isLoadingUser, room, router, user]);

  const isReady = !!(room && room.isActive && !isLoadingQuestions);

  return (
    <PageWithLoading loading={!isReady}>
      <RoomPageLayout
        roomName={room?.name ?? ''}
        roomCode={roomId}
        numberOfQuestions={questions.length}
      >
        <NewQuestionForm onSubmit={handleCreateQuestion}>
          <textarea
            ref={questionContentRef}
            placeholder="What would you like to ask?"
          />

          <NewQuestionFormFooter>
            {user?.name && (
              <UserInfo name={user.name} photoURL={user.photoURL} />
            )}
            <Button type="submit" size="small" disabled={isCreatingQuestion}>
              {user ? 'Ask question' : 'Sign in to ask a question'}
            </Button>
          </NewQuestionFormFooter>
        </NewQuestionForm>

        <QuestionList>
          {questions.map((question) => (
            <Question
              key={question.id}
              adminView={false}
              question={question}
              initialHasLike={question.hasLike}
              onToggleQuestionLike={handleToggleQuestionLike}
            />
          ))}
        </QuestionList>

        {questions.length === 0 && <EmptyQuestions adminView={false} />}
      </RoomPageLayout>
    </PageWithLoading>
  );
};

export default GuestRoomPage;
