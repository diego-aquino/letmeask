import styled, { css } from 'styled-components';

import { Container as UserInfoContainer } from '~/components/common/UserInfo/styles';

interface ContainerProps {
  answered: boolean;
  highlighted: boolean;
}

export const Container = styled.div<ContainerProps>`
  ${({ theme, answered, highlighted }) => css`
    padding: 2.4rem;
    border: 1px solid transparent;
    border-radius: 0.8rem;

    box-shadow: ${theme.effects.shadows.light};

    transition: border-color 0.1s, background-color 0.1s;
    background-color: ${theme.colors.white.details};

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

    & + & {
      margin-top: 0.8rem;
    }

    ${UserInfoContainer} {
      color: ${theme.colors.gray.dark};
      font-weight: 400;
    }

    p {
      color: ${theme.colors.black};
    }

    footer {
      margin-top: 2.4rem;

      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
  `}
`;

export const QuestionControls = styled.div`
  display: flex;
  align-items: flex-end;

  > * + * {
    margin-left: 1.6rem;
  }
`;

const questionControlStyles = css`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    color: ${theme.colors.gray.dark};
    background-color: transparent;

    svg {
      width: 2.4rem;
      height: 2.4rem;
    }
  `}
`;

export const LikesContainer = styled.div`
  ${questionControlStyles}

  align-items: flex-end;
  cursor: default;

  svg {
    margin-right: 0.4rem;
  }
`;

interface ControlButtonProps {
  highlighted?: boolean;
}

export const ControlButton = styled.button<ControlButtonProps>`
  ${({ theme, highlighted }) => css`
    ${questionControlStyles}

    border: none;
    cursor: pointer;

    ${LikesContainer} {
      cursor: inherit;
      color: inherit;
    }

    ${highlighted &&
    css`
      color: ${theme.colors.purple};

      svg path,
      svg circle {
        stroke: ${theme.colors.purple};
      }
    `}

    :hover:not(:disabled) {
      color: ${theme.colors.hover.purple};

      svg path,
      svg circle {
        stroke: ${theme.colors.hover.purple};
      }
    }

    :disabled {
      cursor: default;
      opacity: 0.5;
    }
  `}
`;

export const DeleteButton = styled(ControlButton)`
  ${({ theme }) => css`
    :hover {
      color: ${theme.colors.hover.danger};

      svg path {
        stroke: ${theme.colors.hover.danger};
      }
    }
  `}
`;
