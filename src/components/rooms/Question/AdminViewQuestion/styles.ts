import styled, { css } from 'styled-components';

import { Container as UserInfoContainer } from '~/components/common/UserInfo/styles';

import { Container as BaseContainer } from '../styles';

interface ContainerProps {
  answered: boolean;
  highlighted: boolean;
}

export const Container = styled(BaseContainer)<ContainerProps>`
  ${({ theme, answered, highlighted }) => css`
    border: 1px solid transparent;

    transition: border-color 0.1s, background-color 0.1s;

    ${highlighted &&
    css`
      border-color: ${theme.colors.purple};
      background-color: ${theme.colors.pink.ultraLight};

      ${UserInfoContainer} {
        color: ${theme.colors.black};
      }
    `}

    ${answered &&
    css`
      background-color: ${theme.colors.gray.light};
    `}
  `}
`;
