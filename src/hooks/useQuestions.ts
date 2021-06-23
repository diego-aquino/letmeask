import { useEffect, useMemo, useState } from 'react';

import { Question } from '~/services/questions';
import { getRoomDoc } from '~/services/rooms';

interface UseQuestionsReturn {
  questions: Question[];
  isLoading: boolean;
}

function useQuestions(roomId: string): UseQuestionsReturn {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const roomDoc = useMemo(() => getRoomDoc(roomId), [roomId]);

  useEffect(() => {
    const unsubscribe = roomDoc
      .collection('questions')
      .onSnapshot(async (snapshot) => {
        const snapshotQuestions = snapshot.docs.map(
          (questionDoc) => questionDoc.data() as Question,
        );
        setQuestions(snapshotQuestions);
        setIsLoading(false);
      });

    return unsubscribe;
  }, [roomId, roomDoc]);

  return { questions, isLoading };
}

export default useQuestions;
