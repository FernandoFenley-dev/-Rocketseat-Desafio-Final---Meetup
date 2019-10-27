import styled from 'styled-components';

import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 350px;
  text-align: center;

  form {
    flex-direction: column;
    display: flex;
    margin-top: 30px;
  }

  input {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 0 15px;
    margin: 0 0 10px;
    height: 50px;
    border: 0;
    color: #fff;
    font-size: 1.5em;
  }

  button {
    margin: 5px 0 0;
    height: 50px;
    background: #f94d6a;
    color: #fff;
    border-radius: 4px;
    border: 0;
    font-size: 1.5em;
    font-weight: bold;

    &:hover {
      background: ${darken(0.03, '#f94d6a')};
    }
  }

  a {
    margin-top: 15px;
    color: #fff;
    font-size: 1.5em;
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  }
`;
