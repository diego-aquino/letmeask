import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { FC, useCallback, useEffect } from 'react';

import { RoomPageLayout } from '~/components/layouts';
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

interface PageQuery extends ParsedUrlQuery {
  roomId: string;
}

const AdminRoomPage: FC = () => {
  const router = useRouter();
  const { roomId } = router.query as PageQuery;

  const { user } = useAuth();
  const { room } = useRoom(roomId);
  const { questions } = useQuestions(roomId, user?.id ?? null);

  const handleCloseRoom = useCallback(async () => {
    await closeRoom(roomId);
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
      await answerQuestion(roomId, questionId, isAnswered);
    },
    [roomId],
  );

  const handleHighlightQuestion = useCallback(
    async (questionId: string, isHighlighted: boolean) => {
      await highlightQuestion(roomId, questionId, isHighlighted);
    },
    [roomId],
  );

  useEffect(() => {
    if (room && !room.isActive) {
      router.replace('/');
    }
  }, [room, router]);

  if (!room?.isActive) {
    return null;
  }

  return (
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
  );
};

export default AdminRoomPage;
