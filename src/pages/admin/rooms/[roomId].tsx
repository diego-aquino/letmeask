import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { FC, useCallback, useEffect } from 'react';

import { PageWithLoading, RoomPageLayout } from '~/components/layouts';
import { EmptyQuestions, Question } from '~/components/rooms';
import { useAuth } from '~/contexts/AuthContext';
import { useRoom, useQuestions } from '~/hooks';
import {
  removeQuestion,
  answerQuestion,
  highlightQuestion,
} from '~/services/questions';
import { closeRoom } from '~/services/rooms';
import { QuestionList } from '~/styles/pages/GuestRoomPage';
import { notify } from '~/utils';

interface PageQuery extends ParsedUrlQuery {
  roomId: string;
}

const AdminRoomPage: FC = () => {
  const router = useRouter();
  const { roomId } = router.query as PageQuery;

  const { user, isLoading: isLoadingUser } = useAuth();
  const { room, isLoading: isLoadingRoom } = useRoom(roomId);
  const { questions, isLoading: isLoadingQuestions } = useQuestions(
    roomId,
    user?.id ?? null,
  );

  const handleCloseRoom = useCallback(async () => {
    // eslint-disable-next-line no-alert
    const closeWasConfirmed = window.confirm(
      'Are you sure you want to close this room?',
    );
    if (!closeWasConfirmed) return;

    await closeRoom(roomId);
    notify.success('Room is now closed');
    router.push('/');
  }, [roomId, router]);

  const handleRemoveQuestion = useCallback(
    async (questionId: string) => {
      if (!user) return;

      // eslint-disable-next-line no-alert
      const removalWasConfirmed = window.confirm(
        'Are you sure you want to remove this question?',
      );

      if (!removalWasConfirmed) return;

      await removeQuestion(roomId, questionId);
    },
    [roomId, user],
  );

  const handleAnswerQuestion = useCallback(
    async (questionId: string, isAnswered: boolean) => {
      await answerQuestion(roomId, questionId, isAnswered, {
        removeHighlight: true,
      });
    },
    [roomId],
  );

  const handleHighlightQuestion = useCallback(
    async (questionId: string, isHighlighted: boolean) => {
      await highlightQuestion(roomId, questionId, isHighlighted);
    },
    [roomId],
  );

  const userIsRoomOwner = user && user.id === room?.ownerId;
  const isReady = !!(userIsRoomOwner && room?.isActive && !isLoadingQuestions);

  useEffect(() => {
    if (isLoadingRoom || isLoadingUser) return;

    if (!room?.isActive || !userIsRoomOwner) {
      router.replace('/');
    }
  }, [isLoadingRoom, isLoadingUser, room, router, userIsRoomOwner]);

  return (
    <PageWithLoading loading={!isReady}>
      <RoomPageLayout
        roomName={room?.name ?? ''}
        roomCode={roomId}
        numberOfQuestions={questions.length}
        onCloseRoom={handleCloseRoom}
        admin
      >
        <QuestionList>
          {questions.map((question) => (
            <Question
              key={question.id}
              adminView
              question={question}
              initialIsAnswered={question.isAnswered}
              initialIsHighlighted={question.isHighlighted}
              onAnswerQuestion={handleAnswerQuestion}
              onHighlightQuestion={handleHighlightQuestion}
              onRemoveQuestion={handleRemoveQuestion}
            />
          ))}
        </QuestionList>

        {questions.length === 0 && <EmptyQuestions adminView />}
      </RoomPageLayout>
    </PageWithLoading>
  );
};

export default AdminRoomPage;
