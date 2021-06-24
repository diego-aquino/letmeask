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
    margin-left: 0.8rem;
  }
`;

export const ControlButton = styled.button`
  ${({ theme }) => css`
    border: none;
    cursor: pointer;

    display: flex;
    align-items: center;

    color: ${theme.colors.gray.dark};

    background-color: transparent;

    :hover {
      color: ${theme.colors.hover.purple};

      svg path {
        stroke: ${theme.colors.hover.purple};
      }
    }

    svg {
      width: 2.4rem;
      height: 2.4rem;
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

interface LikeControlProps {
  hasLike?: boolean;
}

export const LikeButton = styled(ControlButton)<LikeControlProps>`
  ${({ theme, hasLike }) => css`
    align-items: flex-end;

    svg {
      margin-right: 0.6rem;
    }

    ${hasLike &&
    css`
      color: ${theme.colors.purple};

      svg path {
        stroke: ${theme.colors.purple};
      }
    `}
  `}
`;
