import styled, { css } from 'styled-components';

import { OnboardingPageLayout } from '~/components/layouts';

export const Container = styled(OnboardingPageLayout)`
  ${({ theme }) => css`
    main {
      h2 {
        font-size: 2.4rem;
        margin-bottom: 4.2rem;
        font-family: 'Poppins', sans-serif;
      }

      input,
      button {
        width: 100%;
      }

      button {
        margin-top: 1.6rem;
      }

      p {
        margin-top: 1.6rem;

        font-size: 1.4rem;
        color: ${theme.colors.gray.dark};

        a {
          color: ${theme.colors.blue};
          text-decoration: none;
          font-weight: 500;

          :hover {
            text-decoration: underline;
          }
        }
      }
    }
  `}
`;
