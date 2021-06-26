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
        border-color: ${theme.colors.hover.blue};
        box-shadow: 0px 0px 0px 1px ${theme.colors.blue};
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

  @media (max-width: 768px) {
    button {
      margin-left: 1.6rem;
    }
  }
`;
export const QuestionList = styled.div`
  margin-top: 3.2rem;
`;
