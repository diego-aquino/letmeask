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

export const NewQuestionFormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.6rem;

  button {
    margin-left: auto;
  }
`;

export const QuestionList = styled.div`
  margin-top: 4.8rem;
`;
