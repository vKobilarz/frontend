import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  flex: 1;
  padding-right: 8px;
  margin-right: 8px;

  display: flex;
  flex-direction: column;
  height: 600px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #404040;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${darken(0.1, '#404040')};
  }
`;

interface OcurrenceItemProps {
  selected: boolean;
}

export const OcurrenceItem = styled.button<OcurrenceItemProps>`
  width: 100%;
  border: 3px solid #ff9000;
  border-radius: 8px;
  background-color: #28262e;
  padding: 16px;
  line-height: 1.7;
  color: #f4ede8;
  transition: background-color 0.2s;

  & + button {
    margin-top: 8px;
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: #ff9000;
      border: 3px solid ${darken(0.1, '#ff9000')};
    `}
`;

export const OcurrenceRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
