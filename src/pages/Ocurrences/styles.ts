import styled from 'styled-components';

export const MapInfoContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 16px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MapInfoContent = styled.div`
  max-width: 1120px;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin-left: 8px;
  }
`;

export const MapContainer = styled.div`
  width: 60%;
  border: 3px solid #ff9000;
  border-radius: 8px;
  height: 600px;
`;

export const OcurrencesContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 16px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
`;

export const OcurrencesContent = styled.div`
  max-width: 1120px;
  width: 100%;
  height: 100%;

  display: flex;
`;

export const Container = styled.div``;

export const Header = styled.header`
  padding: 30px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
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
