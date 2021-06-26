import { useEffect, useReducer } from 'react';

import { getRoomDoc, Room } from '~/services/rooms';
import { Action } from '~/typings';

interface RoomState {
  room: Room | null;
  isLoading: boolean;
}

type RoomAction = Action<'UPDATE', { room?: Room; isLoading?: boolean }>;

function roomReducer(state: RoomState, action: RoomAction) {
  switch (action.type) {
    case 'UPDATE': {
      const { room = state.room, isLoading = state.isLoading } = action;

      return { ...state, room, isLoading };
    }
    default:
      return state;
  }
}

interface UseRoomReturn {
  room: Room | null;
  isLoading: boolean;
}

function useRoom(roomId: string | null): UseRoomReturn {
  const [{ room, isLoading }, dispatch] = useReducer(roomReducer, {
    room: null,
    isLoading: true,
  });

  useEffect(() => {
    if (!roomId) return;

    const roomDoc = getRoomDoc(roomId);

    const requestAndUpdateRoom = async () => {
      dispatch({ type: 'UPDATE', isLoading: true });

      const roomSnapshot = await roomDoc.get();
      if (!roomSnapshot.exists) {
        dispatch({ type: 'UPDATE', isLoading: false });
        return;
      }

      dispatch({
        type: 'UPDATE',
        room: roomSnapshot.data() as Room,
        isLoading: false,
      });
    };

    requestAndUpdateRoom();
  }, [roomId]);

  return { room, isLoading };
}

export default useRoom;
