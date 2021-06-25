import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    color: ${theme.colors.black};
    font-weight: 500;
    font-size: 1.4rem;

    img {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 100%;
    }

    span {
      margin-left: 0.8rem;
    }
  `}
`;
