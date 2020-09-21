import styled from 'styled-components';
import { shade } from 'polished';

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
    height: 100%;
    margin-left: 8px;
  }

  a {
    background: #ff9000;
    height: 56px;
    border-radius: 10px;
    border: 0px;
    padding: 0 16px;
    color: #312e38;
    width: 100%;
    font-weight: 500;
    margin-top: 16px;
    transition: background-color 0.2s;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 16px;

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }

  button {
    margin-left: 16px;
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
