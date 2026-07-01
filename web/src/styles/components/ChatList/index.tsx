import React, { memo, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { ConversationMessage } from '../../../store/slices/ConversationSlice';
import { AssistantBubble, UserBubble, RenderImage, EmptyState, SystemMessage } from './ChatPieces';
import BotTypingLoader from '../BotTypingLoader';
import RegenerateIcon from '../../../assets/icons/RegenerateIcon';

const List = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0 16px;
  display: flex;
  flex-direction: column;
  -webkit-overflow-scrolling: touch;
`;

const RegenRow = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondaryLight};
`;

const HScrollRow = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 6px 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

type Props = {
  messages: ConversationMessage[];
  loading: boolean;
  botTyping: string;
  generatingImage: boolean;
  processMessage: (msg: string) => void;
  handleGenerateImage: (data: any, id: number) => void;
};

const ChatList: React.FC<Props> = ({
  messages, loading, botTyping, generatingImage, processMessage, handleGenerateImage,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, botTyping, generatingImage, loading]);

  const lastMessage = messages[messages.length - 1];

  const renderItem = useCallback((item: ConversationMessage) => {
    switch (item.role) {
      case 'user':
        return <UserBubble key={item.id} text={item.content} />;
      case 'assistant':
        return (
          <AssistantBubble key={item.id} text={item.content} handleGenerate={handleGenerateImage} />
        );
      case 'generate': {
        const isLast = lastMessage?.id === item.id;
        return (
          <div key={item.id}>
            <HScrollRow>
              <RenderImage content={item.content} />
            </HScrollRow>
            {isLast && (
              <RegenRow onClick={() => processMessage('Regenerate')}>
                <RegenerateIcon />
                <span>Regenerate</span>
              </RegenRow>
            )}
          </div>
        );
      }
      case 'system':
        return <SystemMessage key={item.id} processMessage={processMessage} />;
      default:
        return null;
    }
  }, [handleGenerateImage, processMessage, lastMessage]);

  if (messages.length === 0 && !loading && !botTyping) return <EmptyState />;

  return (
    <List>
      {messages.map(renderItem)}
      {loading && <BotTypingLoader />}
      {!loading && botTyping && <AssistantBubble text={botTyping} />}
      {generatingImage && (
        <HScrollRow>
          <RenderImage content={['', '', '']} />
        </HScrollRow>
      )}
      <div ref={bottomRef} />
    </List>
  );
};

export default memo(ChatList);
