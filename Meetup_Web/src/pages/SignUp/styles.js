import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  span {
    text-align: left;
    padding-bottom: 5px;
    padding-left: 10px;
    color: red;
    font-weight: bold;
    color: ${lighten(0.03, '#f94d6a')};
  }
`;
