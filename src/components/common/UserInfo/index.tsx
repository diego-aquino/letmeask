import { FC } from 'react';

import { Container } from './styles';

interface Props {
  name: string;
  photoURL?: string | null;
  boldName?: boolean;
}

const UserInfo: FC<Props> = ({ name, photoURL, boldName = true }) => (
  <Container boldName={boldName}>
    {photoURL && <img src={photoURL} alt={name} />}
    <span>{name}</span>
  </Container>
);

export default UserInfo;
