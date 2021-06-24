import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    padding: 2.4rem;
    border-radius: 0.8rem;

    box-shadow: ${theme.effects.shadows.light};
    background-color: ${theme.colors.white.details};

    & + & {
      margin-top: 0.8rem;
    }

    p {
      color: ${theme.colors.black};
    }

    footer {
      margin-top: 2.4rem;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `}
`;
