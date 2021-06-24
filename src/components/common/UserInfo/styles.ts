import styled, { css } from 'styled-components';

interface ContainerProps {
  boldName: boolean;
}

export const Container = styled.div<ContainerProps>`
  ${({ theme, boldName }) => css`
    display: flex;
    align-items: center;

    img {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 100%;
    }

    span {
      margin-left: 0.8rem;
      color: ${theme.colors.black};
      font-weight: ${boldName ? 500 : 400};
      font-size: 1.4rem;
    }
  `}
`;
