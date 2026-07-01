import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { subscribeToToast } from '../../utils/const/helpers/toast';

const slideIn = keyframes`from { transform: translateY(100px); opacity: 0; } to { transform: translateY(0); opacity: 1; }`;

const ToastWrap = styled.div<{ $type: string }>`
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 380px;
  width: calc(100% - 32px);
  background: ${({ $type }) => ($type === 'error' ? '#E5484D' : $type === 'success' ? '#3CB179' : '#030318')};
  color: white;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  z-index: 9999;
  animation: ${slideIn} 0.25s ease;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
`;

interface ToastState { type: string; message: string; id: number }

const ToastProvider: React.FC = () => {
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const unsub = subscribeToToast((type, message) => {
      setToast({ type, message, id: Date.now() });
      clearTimeout(timer);
      timer = setTimeout(() => setToast(null), 3000);
    });
    return () => { unsub(); clearTimeout(timer); };
  }, []);

  if (!toast) return null;
  return <ToastWrap $type={toast.type} key={toast.id}>{toast.message}</ToastWrap>;
};

export default ToastProvider;
