import { useEffect, useMemo, useState } from 'react';

import { Question } from '~/services/questions';
import { getRoomDoc } from '~/services/rooms';

interface QuestionWithId extends Question {
  id: string;
}

interface UseQuestionsReturn {
  questions: QuestionWithId[];
  isLoading: boolean;
}

function useQuestions(roomId: string): UseQuestionsReturn {
  const [questions, setQuestions] = useState<QuestionWithId[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const roomDoc = useMemo(() => getRoomDoc(roomId), [roomId]);

  useEffect(() => {
    const unsubscribe = roomDoc
      .collection('questions')
      .onSnapshot(async (snapshot) => {
        const snapshotQuestions = snapshot.docs.map(
          (questionDoc) =>
            ({ id: questionDoc.id, ...questionDoc.data() } as QuestionWithId),
        );

        setQuestions(snapshotQuestions);
        setIsLoading(false);
      });

    return unsubscribe;
  }, [roomId, roomDoc]);

  return { questions, isLoading };
}

export default useQuestions;
