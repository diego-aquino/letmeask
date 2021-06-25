import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

interface LoadingOverlayProps {
  $active: boolean;
  $hidden: boolean;
}

export const LoadingOverlay = styled.div<LoadingOverlayProps>`
  ${({ theme, $active: active, $hidden }) => css`
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    position: absolute;
    top: 0;
    left: 0;

    transition: opacity 0.15s;
    background-color: ${theme.colors.white.background};

    svg {
      animation: ${fadeIn} 0.15s ease;
    }

    svg:nth-child(1) {
      width: 14.4rem;
      margin-bottom: 1.6rem;
    }

    svg:nth-child(2) {
      width: 2.8rem;
      height: 2.8rem;

      animation: ${rotate} 0.8s linear infinite;
    }

    ${!active &&
    css`
      opacity: 0;
    `}

    ${$hidden &&
    css`
      z-index: -9999;
    `}
  `}
`;
