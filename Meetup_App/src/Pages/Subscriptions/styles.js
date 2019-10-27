import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 15px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 1,
})`
  margin-bottom: 50px;
`;

export const MeetUp = styled.View`
  background: #fff;
  margin: 10px 0;
`;

export const Banner = styled.Image`
  height: 120px;
  width: 100%;
`;

export const Title = styled.Text`
  padding: 15px;
  text-align: left;
  font-weight: bold;
  color: #333333;
  font-size: 18px;
`;

export const DetailContainer = styled.View`
  text-align: left;
  align-items: baseline;
  justify-content: flex-start;
  flex-direction: row;
  padding: 5px 15px;
`;

export const Detail = styled.Text`
  color: #999999;
  font-size: 13px;
  padding-left: 10px;
  color: #999;
`;

export const SubmitButton = styled.TouchableOpacity`
  margin: 20px auto;
  width: 80%;
  background: #f94d6a;
  height: 40px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const SubmitText = styled.Text`
  color: #fff;
`;

export const NoItens = styled.Text`
  margin-top: 50%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  color: #fff;
  font-size: 20px;
`;
