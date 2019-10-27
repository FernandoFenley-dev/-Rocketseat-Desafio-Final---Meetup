import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  max-width: 60%;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;

    span {
      color: ${lighten(0.03, '#f94d6a')};
    }
  }

  input {
    background: rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    border: 0;
    height: 50px;
    padding-left: 10px;
    color: #fff;
  }

  hr {
    border: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    margin: 10px 0 20px;
  }

  button {
    align-self: flex-end;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    width: 172px;
    margin-top: 10px;
    border-radius: 4px;
    background-color: #d44059;
    border: 0;
    color: #fff;
    font-weight: bold;

    svg {
      padding-right: 10px;
    }
  }

  & > button {
    width: 100px;
  }
`;
