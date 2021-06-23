import styled, { css } from 'styled-components';

export const CopyIconWrapper = styled.div`
  ${({ theme }) => css`
    height: 100%;
    margin-left: -1px;
    padding: 0 1.2rem;
    border-radius: 0.7rem 0 0 0.7rem;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${theme.colors.purple};
    transition: background-color 0.15s;
  `}
`;

export const Container = styled.button`
  ${({ theme }) => css`
    height: 4rem;
    border-radius: 0.8rem;
    border: 1px solid ${theme.colors.purple};

    display: flex;
    align-items: center;

    cursor: pointer;
    background-color: ${theme.colors.white.details};
    transition: border-color 0.15s;

    :hover {
      border-color: ${theme.colors.hover.purple};

      ${CopyIconWrapper} {
        background-color: ${theme.colors.hover.purple};
      }
    }
  `}
`;

export const Code = styled.span`
  display: block;
  padding: 0 1.6rem 0 1.2rem;

  flex: 1;

  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
`;
