import firebase from 'firebase/app';

import { database } from './firebase';

export interface Question {
  content: string;
  author: {
    id: string;
    name: string | null;
    photoURL: string | null;
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
  const { id, name, photoURL } = author;

  const questionDoc = await database
    .collection('rooms')
    .doc(roomId)
    .collection('questions')
    .add({
      content,
      author: { id, name, photoURL },
      isHighlighted,
      isAnswered,
    });

  return questionDoc as QuestionReference;
}
