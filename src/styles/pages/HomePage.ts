import styled, { css } from 'styled-components';

import { OnboardingPageLayout } from '~/components/layouts';

export const Container = styled(OnboardingPageLayout)`
  form {
    input,
    button {
      width: 100%;
    }

    button {
      margin-top: 1.6rem;
    }
  }
`;

export const Separator = styled.div`
  ${({ theme }) => css`
    margin: 4.2rem 0;

    font-size: 1.4rem;
    color: ${theme.colors.gray.dark};

    display: flex;
    align-items: center;

    &::before,
    &::after {
      content: '';
      height: 1px;
      flex: 1;

      background-color: ${theme.colors.gray.medium};
    }

    span {
      padding: 0 1.6rem;
    }
  `}
`;
