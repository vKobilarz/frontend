import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  > header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 32px 0px;

  width: 100%;
  margin: 0 auto;

  h1 {
    margin-bottom: 32px;
    font-size: 20px;
    text-align: left;
  }
  form {
    width: 480px;
    text-align: left;

    h4 {
      margin: 8px;
    }

    label {
      display: block;
      line-height: 2;
      margin-left: 16px;
      cursor: pointer;

      > input {
        margin-right: 8px;
      }
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;
