import styled, { css } from 'styled-components';

import {
  BareCheckIcon as BaseBareCheckIcon,
  CopyIcon as BaseCopyIcon,
} from '~/assets/icons';

export const IconWrapper = styled.div`
  ${({ theme }) => css`
    height: 100%;
    margin-left: -1px;
    padding: 0 1.2rem;
    border-radius: 0.7rem 0 0 0.7rem;

    display: flex;
    justify-content: center;
    align-items: center;

    color: ${theme.colors.white.details};

    position: relative;

    background-color: ${theme.colors.blue};
    transition: background-color 0.15s;

    svg {
      width: 2rem;
      height: 2rem;
    }
  `}
`;

export const Container = styled.button`
  ${({ theme }) => css`
    height: 4rem;
    border-radius: 0.8rem;
    border: 1px solid ${theme.colors.blue};

    display: flex;
    align-items: center;

    cursor: pointer;
    background-color: ${theme.colors.white.details};
    transition: border-color 0.15s;

    :hover {
      border-color: ${theme.colors.hover.blue};

      ${IconWrapper} {
        background-color: ${theme.colors.hover.blue};
      }
    }
  `}
`;

export const CopyIcon = styled(BaseCopyIcon)<{ $active: boolean }>`
  ${({ $active: active }) => css`
    transition: opacity 0.2s;
    opacity: ${active ? 1 : 0};
  `}
`;

export const BareCheckIcon = styled(BaseBareCheckIcon)<{ $active: boolean }>`
  ${({ $active: active }) => css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    transition: opacity 0.2s;
    opacity: ${active ? 1 : 0};

    && {
      width: 1.8rem;
      height: 1.8rem;
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
