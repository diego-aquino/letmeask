import firebase from 'firebase/app';

import { database } from './firebase';

export interface Question {
  id: string;
  content: string;
  author: {
    id: string;
    name: string | null;
    photoURL: string | null;
  };
  isAnswered: boolean;
  isHighlighted: boolean;
  numberOfLikes: number;
}

type QuestionReference = firebase.firestore.DocumentReference<Question>;

export function getQuestionDoc(
  roomId: string,
  questionId: string,
): QuestionReference {
  return database
    .collection('rooms')
    .doc(roomId)
    .collection('questions')
    .doc(questionId) as QuestionReference;
}

interface QuestionToCreate {
  content: string;
  author: {
    id: string;
    name: string | null;
    photoURL: string | null;
  };
  isHighlighted: boolean;
  isAnswered: boolean;
}

export async function createQuestion(
  question: QuestionToCreate,
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
      numberOfLikes: 0,
    });

  return questionDoc as QuestionReference;
}

interface SetQuestionLikeArgs {
  userId: string;
  roomId: string;
  questionId: string;
  newLikeState: boolean;
}

export async function setQuestionLike({
  userId,
  roomId,
  questionId,
  newLikeState,
}: SetQuestionLikeArgs): Promise<void> {
  const questionDoc = getQuestionDoc(roomId, questionId);
  const likeDoc = questionDoc.collection('likes').doc(userId);

  const likeExists = (await likeDoc.get()).exists;

  const noUpdateIsNecessary =
    (newLikeState && likeExists) || (!newLikeState && !likeExists);
  if (noUpdateIsNecessary) return;

  if (newLikeState) {
    await Promise.all([
      questionDoc.update({
        numberOfLikes: firebase.firestore.FieldValue.increment(1),
      }),
      likeDoc.set({}),
    ]);
  } else {
    await Promise.all([
      questionDoc.update({
        numberOfLikes: firebase.firestore.FieldValue.increment(-1),
      }),
      likeDoc.delete(),
    ]);
  }
}

export async function answerQuestion(
  roomId: string,
  questionId: string,
  isAnswered: boolean,
  options: { removeHighlight: boolean },
): Promise<void> {
  const questionDoc = getQuestionDoc(roomId, questionId);

  const isAnsweredPayload = { isAnswered };
  const isHighlightedPayload = { isHighlighted: false };

  return questionDoc.update({
    ...isAnsweredPayload,
    ...(options.removeHighlight ? isHighlightedPayload : {}),
  });
}

export async function highlightQuestion(
  roomId: string,
  questionId: string,
  isHighlighted: boolean,
): Promise<void> {
  const questionDoc = getQuestionDoc(roomId, questionId);
  return questionDoc.update({ isHighlighted });
}

export async function removeQuestion(
  roomId: string,
  questionId: string,
): Promise<void> {
  const questionDoc = getQuestionDoc(roomId, questionId);
  return questionDoc.delete();
}

interface UserDidLikeQuestionArgs {
  userId: string;
  roomId: string;
  questionId: string;
}

export async function userDidLikeQuestion({
  userId,
  roomId,
  questionId,
}: UserDidLikeQuestionArgs): Promise<boolean> {
  const questionDoc = getQuestionDoc(roomId, questionId);
  const likeDoc = questionDoc.collection('likes').doc(userId);
  const hasLiked = (await likeDoc.get()).exists;

  return hasLiked;
}
