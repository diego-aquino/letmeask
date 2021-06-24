import firebase from 'firebase/app';

import { database } from './firebase';

export interface Room {
  name: string;
  ownerId: string;
  isActive: boolean;
}

export type RoomReference = firebase.firestore.DocumentReference<Room>;

export function getRoomDoc(roomId: string): RoomReference {
  return database.collection('rooms').doc(roomId) as RoomReference;
}

export async function createRoom(room: Room): Promise<RoomReference> {
  const { name, ownerId, isActive } = room;
  const roomDoc = await database
    .collection('rooms')
    .add({ name, ownerId, isActive });
  return roomDoc as RoomReference;
}

export async function closeRoom(roomId: string): Promise<void> {
  const roomDoc = getRoomDoc(roomId);
  return roomDoc.update({ isActive: false });
}
