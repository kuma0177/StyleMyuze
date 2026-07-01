import styled, { keyframes } from 'styled-components';
import MyuzeIcon from '../../assets/icons/Myuze';

const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-7px); }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 6px 0;
  margin-right: 60px;
`;

const Bubble = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  background: #F6F7F9;
  border-radius: 16px;
  padding: 12px 16px;
  height: 42px;
`;

const Dot = styled.span<{ $delay: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #282A37;
  display: inline-block;
  animation: ${bounce} 1.05s ${({ $delay }) => $delay} infinite ease-in-out;
`;

const BotTypingLoader = () => (
  <Row>
    <MyuzeIcon />
    <Bubble>
      <Dot $delay="0s" />
      <Dot $delay="0.15s" />
      <Dot $delay="0.3s" />
    </Bubble>
  </Row>
);

export default BotTypingLoader;
