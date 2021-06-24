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
      align-items: flex-end;
    }
  `}
`;

export const QuestionControls = styled.div`
  display: flex;
  align-items: center;

  > * + * {
    margin-left: 1.4rem;
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

export const Likes = styled.div`
  ${questionControlStyles}

  align-items: flex-end;
  cursor: default;

  svg {
    margin-right: 0.4rem;
  }
`;

export const ControlButton = styled.button`
  ${({ theme }) => css`
    ${questionControlStyles}

    border: none;
    cursor: pointer;

    ${Likes} {
      cursor: inherit;
    }

    :hover {
      color: ${theme.colors.hover.purple};

      ${Likes} {
        color: inherit;
      }

      svg path {
        stroke: ${theme.colors.hover.purple};
      }
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
