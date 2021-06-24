import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'outline' | 'outline-gray';

export const Container = styled.button<{ variant: ButtonVariant }>`
  ${({ variant, theme }) => css`
    border-radius: 0.8rem;

    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 500;

    cursor: pointer;

    :disabled {
      cursor: default;
      opacity: 0.6;
    }

    ${variant === 'primary' &&
    css`
      height: 4.8rem;
      padding: 0 3.2rem;

      border: none;

      font-size: 1.6rem;
      color: ${theme.colors.white.details};

      background-color: ${theme.colors.purple};
      transition: background-color 0.15s;

      :hover:not(:disabled) {
        background-color: ${theme.colors.hover.purple};
      }
    `}

    ${variant === 'outline' &&
    css`
      height: 4rem;
      padding: 0 2.4rem;

      border: 1px solid ${theme.colors.purple};

      font-size: 1.4rem;
      color: ${theme.colors.purple};

      background-color: transparent;
      transition: border-color 0.15s, color 0.15s, box-shadow 0.15s;

      :hover:not(:disabled) {
        border-color: ${theme.colors.hover.purple};
        color: ${theme.colors.hover.purple};
        box-shadow: 0px 0px 0px 1px ${theme.colors.purple};
      }
    `}

    ${variant === 'outline-gray' &&
    css`
      height: 4.8rem;
      padding: 0 3.2rem;
      border: 1px solid ${theme.colors.gray.medium};

      font-size: 1.6rem;
      color: ${theme.colors.black};

      background-color: transparent;
      transition: border-color 0.15s, box-shadow 0.15s;

      :hover:not(:disabled) {
        border-color: ${theme.colors.hover.grayMedium};
        box-shadow: 0px 0px 0px 1px ${theme.colors.hover.grayMedium};
      }
    `}
  `}
`;

export const IconWrapper = styled.div`
  margin-right: 1.2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  > svg,
  img {
    width: 2.4rem;
    height: 2.4rem;
  }
`;
