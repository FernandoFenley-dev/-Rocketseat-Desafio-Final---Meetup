import styled from 'styled-components';

export const Container = styled.div`
  max-width: 60%;
  margin: 50px auto;

  & > p {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
  }
`;

export const TitleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    color: #fff;
    font-size: 32px;
    font-weight: bold;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    width: 172px;
    border-radius: 4px;
    background-color: #d44059;
    border: 0;
    color: #fff;
    font-weight: bold;

    svg {
      padding-right: 10px;
    }
  }
`;

export const Meetups = styled.div`
  margin: 50px 0;
`;

export const Meetupdata = styled.div`
  opacity: ${props => (props.past ? 0.45 : 1)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;

  strong {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      opacity: 0.4;
      padding-right: 25px;
    }
  }
`;
