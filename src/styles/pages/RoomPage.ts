import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    header {
      max-width: 1120px;
      margin: 0 auto;
      padding: 2.4rem;
      border-bottom: 1px solid #e2e2e2;

      display: flex;
      justify-content: space-between;
      align-items: center;

      > svg {
        max-height: 5.6rem;
      }
    }

    main {
      max-width: 800px;
      margin: 0 auto;

      form textarea {
        width: 100%;
        min-height: 13rem;
        padding: 1.6rem;
        border: 1px solid transparent;
        border-radius: 0.8rem;
        outline: none;

        background-color: ${theme.colors.white.details};
        box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.12);
        resize: vertical;

        transition: border-color 0.15s, box-shadow 0.15s;

        :focus {
          border-color: ${theme.colors.purple};
          box-shadow: 0px 0px 0px 1px ${theme.colors.purple};
        }
      }
    }
  `}
`;

export const RoomHead = styled.div`
  ${({ theme }) => css`
    margin: 3.2rem 0 2.4rem;
    display: flex;
    align-items: center;

    h1 {
      font-family: 'Poppins', sans-serif;
      font-size: 2.4rem;
      color: ${theme.colors.black};
    }

    span {
      margin-left: 1.6rem;
      border-radius: 99rem;
      padding: 0.8rem 1.6rem;

      color: ${theme.colors.white.details};
      font-weight: 500;
      font-size: 1.4rem;

      background-color: ${theme.colors.pink.dark};
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

export const UserInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    img {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 100%;
    }

    span {
      margin-left: 0.8rem;
      color: ${theme.colors.black};
      font-weight: 500;
      font-size: 1.4rem;
    }
  `}
`;
