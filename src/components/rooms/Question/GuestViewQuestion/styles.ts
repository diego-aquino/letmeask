import styled, { css } from 'styled-components';

import { ControlButton, Likes } from '../styles';

interface LikeControlProps {
  hasLike?: boolean;
}

export const LikeButton = styled(ControlButton)<LikeControlProps>`
  ${({ theme, hasLike }) => css`
    ${hasLike &&
    css`
      color: ${theme.colors.purple};

      ${Likes} {
        color: inherit;
      }

      svg path {
        stroke: ${theme.colors.purple};
      }
    `}
  `}
`;
