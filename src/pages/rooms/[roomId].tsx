import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { FC, FormEvent, useMemo, useRef, useState } from 'react';

import { Logo } from '~/assets/icons';
import { Button } from '~/components/common';
import { RoomCode } from '~/components/rooms';
import { useAuth } from '~/contexts/AuthContext';
import { useQuestions, useRoom } from '~/hooks';
import { createQuestion } from '~/services/questions';
import {
  Container,
  FormFooter,
  RoomHead,
  UserInfo,
} from '~/styles/pages/RoomPage';

interface PageQuery extends ParsedUrlQuery {
  roomId: string;
}

const RoomPage: FC = () => {
  const { query } = useRouter();
  const { roomId } = query as PageQuery;

  const { user } = useAuth();

  const questionContentRef = useRef<HTMLTextAreaElement>(null);
  const [isSendingQuestion, setIsSendingQuestion] = useState(false);

  const { room } = useRoom(roomId);
  const { questions } = useQuestions(roomId);

  const handleSendQuestion = async (event: FormEvent) => {
    event.preventDefault();

    const questionContent = questionContentRef.current?.value.trim();
    if (!questionContent) return;

    setIsSendingQuestion(true);

    if (!user) return;

    const question = {
      content: questionContent,
      author: {
        id: user.id,
        name: user.displayName,
        avatar: user.photoURL,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    if (questionContentRef.current) {
      questionContentRef.current.value = '';
    }

    await createQuestion(question, roomId);
    setIsSendingQuestion(false);
  };

  const questionsLeftLabel = useMemo(() => {
    if (questions.length === 0) return null;
    const shouldUsePlural = questions.length > 1;
    return `${questions.length} question${shouldUsePlural ? 's' : ''}`;
  }, [questions.length]);

  return (
    <Container>
      <header>
        <Logo role="img" aria-label="Letmeask" />
        <RoomCode code={roomId} />
      </header>

      <main>
        <RoomHead>
          <h1>{room && `Sala ${room.name}`}</h1>
          <span>{questionsLeftLabel}</span>
        </RoomHead>

        <form onSubmit={handleSendQuestion}>
          <textarea
            ref={questionContentRef}
            placeholder="What would you like to ask?"
          />

          <FormFooter>
            {user ? (
              <UserInfo>
                {user.photoURL && (
                  <img src={user.photoURL} alt={user.displayName || ''} />
                )}
                <span>{user.displayName}</span>
              </UserInfo>
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
        </form>
      </main>
    </Container>
  );
};

export default RoomPage;
