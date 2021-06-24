import styled, { css } from 'styled-components';

export const NewQuestionForm = styled.form`
  ${({ theme }) => css`
    textarea {
      width: 100%;
      min-height: 13rem;
      padding: 1.6rem;
      border: 1px solid transparent;
      border-radius: 0.8rem;
      outline: none;

      background-color: ${theme.colors.white.details};
      box-shadow: ${theme.effects.shadows.default};
      resize: vertical;

      transition: border-color 0.15s, box-shadow 0.15s;

      :focus {
        border-color: ${theme.colors.hover.purple};
        box-shadow: 0px 0px 0px 1px ${theme.colors.purple};
      }
    }
  `}
`;

export const FormFooter = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.6rem;

    > span {
      font-size: 1.4rem;
      color: ${theme.colors.gray.dark};
      font-weight: 500;

      button {
        font-size: 1.4rem;
        font-weight: 500;
        border: none;
        color: ${theme.colors.purple};
        background-color: transparent;
        cursor: pointer;

        :hover {
          text-decoration: underline;
        }
      }
    }
  `}
`;

export const QuestionList = styled.div`
  margin-top: 3.2rem;
`;
