import styled, { css } from 'styled-components';

interface ContainerProps {
  keepLabelOutside?: boolean;
}

export const Container = styled.div<ContainerProps>`
  ${({ theme, keepLabelOutside }) => css`
    position: relative;

    label {
      position: absolute;
      top: 50%;
      left: 1.6rem;

      color: ${theme.colors.black};

      transform: translateY(-50%);
      opacity: 0.7;
      transition: top 0.15s, left 0.15s, transform 0.15s, font-weight 0.15s,
        color 0.15s, opacity 0.15s;
      cursor: text;

      ${keepLabelOutside &&
      css`
        top: -2.6rem;
        left: 0;

        transform: translateY(0%);
        opacity: 1;
      `}
    }

    input {
      height: 5rem;
      border-radius: 0.8rem;
      padding: 0 1.6rem;
      border: 1px solid ${theme.colors.gray.medium};
      outline: none;

      background-color: ${theme.colors.white.details};
      transition: border-color 0.15s, box-shadow 0.15s;

      :focus {
        border-color: ${theme.colors.blue};
        box-shadow: 0px 0px 0px 1px ${theme.colors.blue};
      }

      ::placeholder {
        opacity: 0;
      }
    }

    :focus-within {
      label {
        top: -2.6rem;
        left: 0;

        font-weight: 500;
        color: ${theme.colors.hover.blue};
        transform: translateY(0%);

        opacity: 1;
      }
    }
  `}
`;
