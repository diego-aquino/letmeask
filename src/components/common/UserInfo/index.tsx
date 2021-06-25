import { FC } from 'react';

import { Container } from './styles';

interface Props {
  name: string;
  photoURL?: string | null;
}

const UserInfo: FC<Props> = ({ name, photoURL }) => (
  <Container>
    {photoURL && <img src={photoURL} alt={name} />}
    <span>{name}</span>
  </Container>
);

export default UserInfo;
