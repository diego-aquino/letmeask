import { useRouter } from 'next/router';
import { FC } from 'react';

import { Container } from '~/styles/pages/RoomPage';

const RoomPage: FC = () => {
  const { query } = useRouter();

  return <Container>{query.roomId}</Container>;
};

export default RoomPage;
