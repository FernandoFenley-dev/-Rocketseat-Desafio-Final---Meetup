import styled from 'styled-components';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.1);
`;

export const Content = styled.div`
  height: 92px;
  display: flex;
  justify-content: space-between;
  max-width: 60%;
  margin: 0 auto;
  color: #fff;
  align-items: center;

  aside {
    display: flex;
    align-items: center;
  }

  img {
    width: 50px;
    height: 50px;
  }
`;

export const Profile = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    margin-right: 10px;
    margin: auto 0;
    padding: 0 25px;
    text-align: right;

    strong {
      display: block;
    }

    a {
      display: block;
      margin-top: 3px;
      opacity: 0.4;
      color: #fff;
    }
  }

  button {
    height: 42px;
    width: 72px;
    border-radius: 4px;
    background-color: #d44059;
    border: 0;
    color: #fff;
    font-weight: bold;
  }
`;
