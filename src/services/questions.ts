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
  isHighlighted: boolean;
  isAnswered: boolean;
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

interface ToggleQuestionLikeResources {
  userId: string;
  roomId: string;
  questionId: string;
  newLikeState: boolean;
}

export async function toggleQuestionLike({
  userId,
  roomId,
  questionId,
  newLikeState,
}: ToggleQuestionLikeResources): Promise<void> {
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

interface UserLikesQuestionResources {
  userId: string;
  roomId: string;
  questionId: string;
}

export async function userLikesQuestion({
  userId,
  roomId,
  questionId,
}: UserLikesQuestionResources): Promise<boolean> {
  const questionDoc = getQuestionDoc(roomId, questionId);
  const likeDoc = questionDoc.collection('likes').doc(userId);
  const hasLiked = (await likeDoc.get()).exists;

  return hasLiked;
}

export async function removeQuestion(
  roomId: string,
  questionId: string,
): Promise<void> {
  const questionDoc = getQuestionDoc(roomId, questionId);
  return questionDoc.delete();
}
