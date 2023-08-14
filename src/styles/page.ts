import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  > h4 {
    margin-bottom: -32px;
  }
`;

export const Form = styled.form`
  display: flex;
  gap: 24px;
  align-items: flex-end;
  justify-content: space-between;
  width: 400px;

  > button {
    padding: 4px;
  }
`;
