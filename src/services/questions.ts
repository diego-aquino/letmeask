import firebase from 'firebase/app';

import { database } from './firebase';

export interface Question {
  content: string;
  author: {
    id: string;
    name?: string | null;
    avatar?: string | null;
  };
  isHighlighted: boolean;
  isAnswered: boolean;
}

type QuestionReference = firebase.firestore.DocumentReference<Question>;

export async function createQuestion(
  question: Question,
  roomId: string,
): Promise<QuestionReference> {
  const { content, author, isHighlighted, isAnswered } = question;
  const { id, name, avatar } = author;

  const questionDoc = await database
    .collection('rooms')
    .doc(roomId)
    .collection('questions')
    .add({
      content,
      author: { id, name, avatar },
      isHighlighted,
      isAnswered,
    });

  return questionDoc as QuestionReference;
}
