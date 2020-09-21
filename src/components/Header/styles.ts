import styled from 'styled-components';
import { darken } from 'polished';

export const UserActions = styled.div`
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    color: #999591;
    padding-right: 8px;
    margin-right: 8px;
    border-right: 1px solid #999591;
    transition: 0.2s color;

    &:hover {
      color: ${darken(0.2, '#999591')};
    }
  }
`;

export const Header = styled.header`
  padding: 30px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
      transition: 0.2s color;

      &:hover {
        color: ${darken(0.2, '#999591')};
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    line-height: 24px;

    span {
      color: #f4ede8;
    }
    a {
      text-decoration: none;
      color: #ff9000;

      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
