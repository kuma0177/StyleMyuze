import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Layout from '../../styles/components/Layout';
import ChatList from '../../styles/components/ChatList';
import SendIcon from '../../assets/icons/Send';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addAssistantMessage, addMessage, addUserMessage, ConversationMessage,
} from '../../store/slices/ConversationSlice';
import { nanoid } from '@reduxjs/toolkit';
import { splitParagraphAndSchema } from '../../utils/const/splitPara&Json';
import { showToast } from '../../utils/const/helpers/toast';
import { ERROR_MESSAGES } from '../../utils/const/helpers/errorMessages';

const BASE_URL = 'https://f18rfk2917.execute-api.us-east-1.amazonaws.com';

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 16px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.radius20}px;
  height: 50px;
  margin-bottom: 16px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  flex-shrink: 0;
`;

const TextInput = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 14px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: transparent;
  &::placeholder { color: ${({ theme }) => theme.colors.textSecondaryLight}; }
`;

const SendBtn = styled.button`
  background: none;
  border: none;
  padding: 4px 8px 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:disabled { opacity: 0.4; cursor: default; }
`;

const Home: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const { messages } = useAppSelector(state => state.conversation);
  const dispatch = useAppDispatch();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [botTyping, setBotTyping] = useState('');

  const sendToBackend = useCallback(async (msgs: ConversationMessage[]) => {
    const res = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, messages: msgs }),
    });
    return res.json();
  }, [user]);

  const generateImage = useCallback(async (prompt: string) => {
    const res = await fetch(`${BASE_URL}/image/flux`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, aspect_ratio: '1:1', response_format: 'url', save: false }),
    });
    return res.json();
  }, []);

  const processMessage = useCallback(async (text: string) => {
    const filtered = messages.filter(m => m.role === 'user' || m.role === 'assistant');
    const newMsgs: ConversationMessage[] = [
      ...filtered,
      { id: nanoid(), role: 'user', content: text },
    ];

    dispatch(addUserMessage(text));
    setInput('');
    setLoading(true);

    try {
      const res = await sendToBackend(newMsgs);
      const { paragraph, schema: actionSchema } = splitParagraphAndSchema(res);

      let idx = 0;
      setBotTyping('');
      const typeMessage = () => {
        idx++;
        setBotTyping(paragraph.slice(0, idx));
        if (idx < paragraph.length) {
          setTimeout(typeMessage, 20);
        } else {
          dispatch(addAssistantMessage(res));
          setBotTyping('');

          if (actionSchema?.intent === 'generate') {
            setGeneratingImage(true);
            generateImage(actionSchema.prompt)
              .then(response => {
                if (response?.images) {
                  dispatch(addMessage({ role: 'generate', content: JSON.stringify(response.images) }));
                }
              })
              .catch(() => showToast('error', ERROR_MESSAGES.IMAGE_GENERATE_ERROR))
              .finally(() => setGeneratingImage(false));
          }
        }
      };
      typeMessage();
    } catch {
      showToast('error', ERROR_MESSAGES.CHAT_RESPONSE_ERROR);
    } finally {
      setLoading(false);
    }
  }, [messages, dispatch, sendToBackend, generateImage]);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    processMessage(input);
  }, [input, processMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleGenerateImage = useCallback((data: any, id: number) => {
    processMessage(`Generate visuals on outfit ${id}`);
  }, [processMessage]);

  return (
    <Layout>
      <ChatArea>
        <ChatList
          messages={messages}
          loading={loading}
          botTyping={botTyping}
          generatingImage={generatingImage}
          processMessage={processMessage}
          handleGenerateImage={handleGenerateImage}
        />
        <InputRow>
          <TextInput
            placeholder="Ask me anything..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SendBtn onClick={handleSend} disabled={loading || generatingImage}>
            <SendIcon />
          </SendBtn>
        </InputRow>
      </ChatArea>
    </Layout>
  );
};

export default Home;
