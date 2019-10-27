import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  max-width: 60%;
  margin: 50px auto;

  & > button {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    width: 100px;
    margin-top: 10px;
    border-radius: 4px;
    background-color: #d44059;
    border: 0;
    color: #fff;
    font-weight: bold;
  }

  form {
    display: flex;
    flex-direction: column;

    & > input,
    input[name='date'] {
      background: rgba(0, 0, 0, 0.1);
      margin-top: 10px;
      border: 0;
      height: 50px;
      padding-left: 10px;
      color: #fff;
    }

    & > span {
      padding-top: 5px;
      color: red;
      font-weight: bold;
      color: ${lighten(0.03, '#f94d6a')};
    }

    .description {
      background: rgba(0, 0, 0, 0.1);
      margin-top: 10px;
      border: 0;
      resize: none;
      padding-top: 10px;
      padding-left: 10px;
      color: #fff;
    }

    & > button {
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
  }
`;
