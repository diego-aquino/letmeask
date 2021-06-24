import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { FC, useCallback, useEffect } from 'react';

import { RoomPageLayout } from '~/components/layouts';
import { Question } from '~/components/rooms';
import { useAuth } from '~/contexts/AuthContext';
import { useRoom, useQuestions } from '~/hooks';
import { removeQuestion } from '~/services/questions';
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
            id={question.id}
            content={question.content}
            authorName={question.author.name ?? ''}
            authorPhotoURL={question.author.photoURL}
            adminView
            onRemoveQuestion={handleRemoveQuestion}
          />
        ))}
      </QuestionList>
    </RoomPageLayout>
  );
};

export default AdminRoomPage;
