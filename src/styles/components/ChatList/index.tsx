import React, { memo, useMemo, useCallback, useRef, useEffect } from 'react';
import { FlatList, View, TouchableOpacity, ScrollView } from 'react-native';
import {
  AssistantBubble,
  UserBubble,
  RenderImage,
  EmptyState,
} from './ChatPieces';
import { memoizedStyles } from './chatStyles';
import { ConversationMessage } from '../../../store/slices/ConversationSlice';
import BotTypingLoader from '../BotTypingLoader';
import { flexRow } from '../../mixins';
import theme from '../../theme';
import RegenerateIcon from '../../../assets/icons/RegenerateIcon';
import Text from '../Text';
import CustomButton from '../Button';
import Myuze from '../../../assets/icons/Myuze';

type Props = {
  messages: ConversationMessage[];
  loading: boolean;
  botTyping: string;
  generatingImage: boolean;
  processMessage: (msg: string) => void;
  handleGenerateImage: (data: any, id: number) => void;
};

const ListFooter = memo(
  ({
    loading,
    botTyping,
    generatingImage,
  }: Omit<Props, 'messages' | 'processMessage' | 'handleGenerateImage'>) => {
    if (loading) return <BotTypingLoader />;
    if (botTyping) return <AssistantBubble text={botTyping} />;
    if (generatingImage) {
      return (
        <View style={[flexRow, { marginVertical: theme.spacing.small }]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: theme.spacing.small }}
          >
            <RenderImage content={['', '', '']} />
          </ScrollView>
        </View>
      );
    }
    return null;
  },
);

const ChatList: React.FC<Props> = ({
  messages,
  loading,
  botTyping,
  generatingImage,
  processMessage,
  handleGenerateImage,
}) => {
  const flatListRef = useRef<FlatList<any>>(null);

  const lastMessage = useMemo(() => messages[messages.length - 1], [messages]);

  const keyExtractor = useCallback(
    (item: ConversationMessage, idx: number) =>
      item.id ? String(item.id) : `msg-${idx}`,
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: ConversationMessage }) => {
      switch (item.role) {
        case 'user':
          return <UserBubble text={item.content} />;
        case 'assistant':
          return (
            <AssistantBubble
              text={item.content}
              handleGenerate={handleGenerateImage}
            />
          );
        case 'generate':
          const showRegenerateBtn =
            lastMessage.content && item.id === lastMessage.id;
          return (
            <View>
              <View style={[flexRow, { marginVertical: theme.spacing.small }]}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: theme.spacing.small }}
                >
                  <RenderImage content={item.content} />
                </ScrollView>
              </View>
              {showRegenerateBtn && (
                <TouchableOpacity
                  onPress={() => processMessage('Regenerate')}
                  style={memoizedStyles.regenerateButtonContainer}
                >
                  <RegenerateIcon />
                  <Text color={theme.colors.textSecondaryLight}>
                    Regenerate
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        case 'system':
          return (
            <View style={memoizedStyles.assistantBubbleContainer}>
              <Myuze />
              <View style={memoizedStyles.assistantBubbleWidth}>
                <View style={memoizedStyles.assistantBubble}>
                  <Text style={{ color: theme.colors.gray900 }}>
                    {`Whoa, style superstar — you've maxed out your free creative sparks for today!`}
                  </Text>
                </View>

                <View style={memoizedStyles.assistantBubble}>
                  <Text style={{ color: theme.colors.gray900 }}>
                    On the free plan, you get:
                    {'\n'}✨ 5 image prompts/day
                    {'\n'}🎥 1 video/day
                    {'\n\n'}But why stop there? Go{' '}
                    <Text fontWeight={'800'}>Premium</Text> to unlock:
                    {'\n'}🚀 50 images/day
                    {'\n'}🎬 10 videos/day
                  </Text>
                </View>

                <View style={memoizedStyles.assistantBubble}>
                  <Text
                    style={{
                      color: theme.colors.gray900,
                      marginBottom: theme.spacing.medium,
                    }}
                  >
                    All for just <Text fontWeight={'800'}>$5/month</Text> or{' '}
                    <Text fontWeight={'800'}>$1.25/week</Text>
                    {'\n\n'}Subscribe now and keep your fashion magic flowing!
                    ✨
                  </Text>

                  <View style={{ gap: theme.spacing.small }}>
                    <CustomButton
                      buttonType="primary"
                      title="Upgrade and keep styling"
                      onPress={() => {
                        console.log('upgrade button pressed');
                        // Add your upgrade logic here
                      }}
                    />
                    <CustomButton
                      buttonType="ghost"
                      title="I will wait until tomorrow"
                      onPress={() => {
                        processMessage('I will wait till tomorrow');
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          );
        default:
          return null;
      }
    },
    [handleGenerateImage, processMessage, lastMessage],
  );

  if (messages.length === 0) return <EmptyState />;

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={memoizedStyles.chatContentContainer}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={
        <ListFooter
          loading={loading}
          botTyping={botTyping}
          generatingImage={generatingImage}
        />
      }
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={10}
      removeClippedSubviews={true}
      updateCellsBatchingPeriod={100}
      onEndReachedThreshold={0.5}
      scrollEventThrottle={16}
      onContentSizeChange={() => {
        requestAnimationFrame(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        });
      }}
    />
  );
};

export default memo(ChatList);
