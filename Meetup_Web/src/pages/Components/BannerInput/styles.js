import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: #fff;
  height: 250px;

  &:hover {
    opacity: 0.5;
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 20px;
    font-weight: bold;

    &:hover {
      cursor: pointer;
    }

    input {
      display: none;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
