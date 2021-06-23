import firebase from 'firebase/app';

import { database } from './firebase';

interface Room {
  name: string;
  ownerId: string;
}

type RoomReference = firebase.firestore.DocumentReference<Room>;

export async function createRoom(room: Room): Promise<RoomReference> {
  const { name, ownerId } = room;
  const roomDoc = await database.collection('rooms').add({ name, ownerId });
  return roomDoc as RoomReference;
}

export async function getRoomById(roomId: string): Promise<RoomReference> {
  const roomDoc = database.collection('rooms').doc(roomId);
  return roomDoc as RoomReference;
}
