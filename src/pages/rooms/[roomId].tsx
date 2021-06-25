import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react';

import { Button, UserInfo } from '~/components/common';
import { RoomPageLayout } from '~/components/layouts';
import { Question } from '~/components/rooms';
import { useAuth } from '~/contexts/AuthContext';
import { useRoom, useQuestions } from '~/hooks';
import { createQuestion, setQuestionLike } from '~/services/questions';
import {
  NewQuestionForm,
  FormFooter,
  QuestionList,
} from '~/styles/pages/GuestRoomPage';

interface PageQuery extends ParsedUrlQuery {
  roomId: string;
}

const GuestRoomPage: FC = () => {
  const router = useRouter();
  const { roomId } = router.query as PageQuery;

  const { user } = useAuth();
  const { room } = useRoom(roomId);
  const { questions } = useQuestions(roomId, user?.id ?? null);

  const questionContentRef = useRef<HTMLTextAreaElement>(null);
  const [isSendingQuestion, setIsSendingQuestion] = useState(false);

  const handleSendQuestion = async (event: FormEvent) => {
    event.preventDefault();

    const questionContent = questionContentRef.current?.value.trim();
    if (!questionContent) return;

    setIsSendingQuestion(true);

    if (!user) return;

    if (questionContentRef.current) {
      questionContentRef.current.value = '';
    }

    const question = {
      content: questionContent,
      author: {
        id: user.id,
        name: user.name,
        photoURL: user.photoURL,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await createQuestion(question, roomId);
    setIsSendingQuestion(false);
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
    >
      <NewQuestionForm onSubmit={handleSendQuestion}>
        <textarea
          ref={questionContentRef}
          placeholder="What would you like to ask?"
        />

        <FormFooter>
          {user?.name ? (
            <UserInfo name={user.name} photoURL={user.photoURL} />
          ) : (
            <span>
              Para enviar uma pergunta,&nbsp;
              <button type="button">faça login</button>
            </span>
          )}
          <Button type="submit" disabled={!user || isSendingQuestion}>
            Send question
          </Button>
        </FormFooter>
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
    </RoomPageLayout>
  );
};

export default GuestRoomPage;
