import styled from 'styled-components';

const border = () => `
  border: 1px solid red;
  `;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  > h4 {
    margin-bottom: -32px;
  }

  .list {
    ${border}
    padding: 24px;

    > li {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      min-width: 400px;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  gap: 24px;
  align-items: flex-end;
  justify-content: space-between;
  width: 400px;
  padding: 24px;

  ${border}

  > button,
  input,
  select {
    padding: 4px;
  }
`;

export const MarkdownContainer = styled.div`
  > h4 {
    text-align: center;
  }
`;
