import { useEffect, useMemo, useState } from 'react';

import { getRoomDoc, Room } from '~/services/rooms';

interface UseRoomReturn {
  room: Room | null;
  isLoading: boolean;
}

function useRoom(roomId: string): UseRoomReturn {
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const roomDoc = useMemo(() => getRoomDoc(roomId), [roomId]);

  useEffect(() => {
    const requestAndUpdateRoom = async () => {
      setIsLoading(true);
      const roomSnapshot = await roomDoc.get();
      if (!roomSnapshot.exists) return;

      setRoom(roomSnapshot.data() as Room);
      setIsLoading(false);
    };

    requestAndUpdateRoom();
  }, [roomDoc, roomId]);

  return { room, isLoading };
}

export default useRoom;
