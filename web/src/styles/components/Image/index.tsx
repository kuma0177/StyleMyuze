import React, { useState, ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

const Wrap = styled.div<{ $w: string | number; $h: string | number; $r: number }>`
  width: ${({ $w }) => (typeof $w === 'number' ? `${$w}px` : $w)};
  height: ${({ $h }) => (typeof $h === 'number' ? `${$h}px` : $h)};
  border-radius: ${({ $r }) => $r}px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Skeleton = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.gray200};
  animation: ${pulse} 1.4s ease-in-out infinite;
`;

const Img = styled.img<{ $loaded: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.2s;
`;

const OverlayWrap = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

type Props = {
  url?: string | null;
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  overlayButton?: ReactNode;
};

const CustomImage: React.FC<Props> = ({ url, width = '100%', height = 200, borderRadius = 0, overlayButton }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Wrap $w={width} $h={height} $r={borderRadius}>
      {(!url || !loaded) && <Skeleton />}
      {url && <Img src={url} $loaded={loaded} onLoad={() => setLoaded(true)} alt="" />}
      {overlayButton && <OverlayWrap>{overlayButton}</OverlayWrap>}
    </Wrap>
  );
};

export default CustomImage;
