import styled from 'styled-components';

const Track = styled.div`
  background: #F5F6F8;
  border-radius: 50px;
  overflow: hidden;
  width: 100%;
  height: 8px;
`;

const Fill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  border-radius: 50px;
  background: linear-gradient(90deg, #595CFF 0%, #C6F8FF 100%);
  transition: width 0.3s ease;
`;

const GradientProgressBar = ({ progress = 0.5 }: { progress?: number }) => {
  const pct = Math.round(Math.min(1, Math.max(0, progress)) * 100);
  return <Track><Fill $pct={pct} /></Track>;
};

export default GradientProgressBar;
