import styled, { css } from 'styled-components';

export const Container = styled.input`
  ${({ theme }) => css`
    height: 5rem;
    border-radius: 0.8rem;
    padding: 0 1.6rem;
    border: 1px solid ${theme.colors.gray.medium};
    outline: none;

    background-color: ${theme.colors.white.details};
    transition: border-color 0.15s, box-shadow 0.15s;

    :focus {
      border-color: ${theme.colors.purple};
      box-shadow: 0px 0px 0px 1px ${theme.colors.purple};
    }
  `}
`;
