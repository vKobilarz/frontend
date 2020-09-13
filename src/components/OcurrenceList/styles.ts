import styled, { css } from 'styled-components';

export const Container = styled.div`
  flex: 1;
  margin-right: 16px;

  display: flex;
  flex-direction: column;
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

  & + button {
    margin-top: 8px;
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: #ff9000;
    `}
`;

export const OcurrenceRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
