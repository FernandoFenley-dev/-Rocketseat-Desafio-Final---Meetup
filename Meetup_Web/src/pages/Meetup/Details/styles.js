import styled from 'styled-components';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const Container = styled.div`
  max-width: 60%;
  margin: 50px auto;

  & > button {
    margin-left: 0;
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

  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ActionButton = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  width: 116px;
  border-radius: 4px;
  border: 0;
  color: #fff;
  font-weight: bold;
  margin-left: 15px;
  background-color: ${props => props.color};

  svg {
    padding-right: 10px;
  }
`;

export const Meetups = styled.div`
  margin: 50px 0;
  color: #fff;

  p {
    margin-top: 20px;
    font-size: 18px;
    text-align: justify;
  }

  ul {
    display: flex;
    align-items: center;
    margin-top: 20px;

    > li {
      display: flex;
      align-items: baseline;
      padding-right: 15px;
      font-size: 16px;
      opacity: 0.6;
    }

    svg {
      margin-right: 5px;
    }
  }
`;
