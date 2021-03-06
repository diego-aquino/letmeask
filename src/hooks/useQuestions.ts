import { useEffect, useState } from 'react';

import { Question, userDidLikeQuestion } from '~/services/questions';
import { getRoomDoc } from '~/services/rooms';

interface QuestionWithLikeState extends Question {
  hasLike: boolean;
}

interface UseQuestionsReturn {
  questions: QuestionWithLikeState[];
  isLoading: boolean;
}

function useQuestions(
  roomId: string | null,
  userId: string | null,
): UseQuestionsReturn {
  const [questions, setQuestions] = useState<QuestionWithLikeState[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    const roomDoc = getRoomDoc(roomId);

    const unsubscribe = roomDoc
      .collection('questions')
      .onSnapshot({ includeMetadataChanges: true }, async (snapshot) => {
        const snapshotQuestions = await Promise.all(
          snapshot.docs.map(async (questionDoc) => {
            const questionId = questionDoc.id;

            const hasLike = userId
              ? await userDidLikeQuestion({
                  userId,
                  roomId,
                  questionId,
                })
              : false;

            return {
              id: questionId,
              hasLike,
              ...questionDoc.data(),
            } as QuestionWithLikeState;
          }),
        );

        setQuestions(snapshotQuestions);
        setIsLoading(false);
      });

    // eslint-disable-next-line consistent-return
    return unsubscribe;
  }, [userId, roomId]);

  return { questions, isLoading };
}

export default useQuestions;
