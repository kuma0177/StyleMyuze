import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Layout from '../../styles/components/Layout';
import { alignItemsCenter, flex1, flexRow } from '../../styles/mixins';
import theme from '../../styles/theme';
import SendIcon from '../../assets/icons/Send';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addAssistantMessage,
  addMessage,
  addUserMessage,
  ConversationMessage,
} from '../../store/slices/ConversationSlice';
import { nanoid } from '@reduxjs/toolkit';
import { splitParagraphAndSchema } from '../../utils/const/splitPara&Json';
import { config } from '../../../config';
import { showToast } from '../../utils/const/helpers/toast';
import { ERROR_MESSAGES } from '../../utils/const/helpers/errorMessages';
import ChatList from '../../styles/components/ChatList';
import { reserveUsage } from '../../services';

const memoizedStyles = StyleSheet.create({
  chatContentContainer: {
    paddingBottom: 16,
  },
  userBubbleContainer: {
    alignSelf: 'flex-end',
    marginVertical: 6,
    marginLeft: 60,
  },
  userBubble: {
    backgroundColor: '#2972FF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    maxWidth: '78%',
  },
  userBubbleText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 21,
  },
  assistantBubbleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginVertical: 6,
    marginRight: 60,
  },
  assistantBubble: {
    backgroundColor: '#F6F7F9',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    maxWidth: '78%',
    gap: 8,
  },
  shadowEffectIOS: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  showEffectAndroid: {
    elevation: 4,
    backgroundColor: '#fff',
  },
  generateImageButton: {
    marginTop: 8,
    backgroundColor: '#2972FF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  generateImageButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  assistantBubbleWidth: {
    width: '100%',
  },
  outfitContainer: {
    gap: theme.spacing.small,
    marginVertical: theme.spacing.small,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  emptyStateContainer: {
    gap: theme.spacing.small,
  },
  inputContainer: {
    borderWidth: theme.borderWidth.thin,
    borderRadius: theme.borderRadius.medium,
    borderColor: theme.colors.border,
    height: theme.height.height50,
    marginBottom: theme.spacing.large,
  },
  textInput: {
    paddingHorizontal: theme.spacing.medium,
    height: theme.height.height50,
    color: theme.colors.textPrimary,
  },
  chatContainer: {
    paddingHorizontal: theme.spacing.xLarge,
    paddingBottom: theme.spacing.none,
  },
  regenerateButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.xsmall,
    marginVertical: theme.spacing.small,
  },
  regenerateButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const keyboardAvoidingStyle = [flex1];
const chatContainerStyle = [flex1, memoizedStyles.chatContainer];
const inputContainerStyle = [
  flexRow,
  alignItemsCenter,
  memoizedStyles.inputContainer,
  memoizedStyles.shadowEffectIOS,
  memoizedStyles.showEffectAndroid,
];
const textInputStyle = [flex1, memoizedStyles.textInput];

const Home = () => {
  const { user } = useAppSelector(state => state.auth);
  const { messages } = useAppSelector(state => state.conversation);
  const dispatch = useAppDispatch();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [generatingImage, toggleGeneratingImage] = useState<boolean>(false);

  const sendMessageToBackend = useCallback(
    async (messagesToSend: ConversationMessage[]) => {
      try {
        const response = await fetch(`${config.BASE_URL}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: user,
            messages: messagesToSend,
          }),
        });
        const data = await response.json();
        return data;
      } catch (e) {
        console.log('Error >>', e);
      }
    },
    [user],
  );

  const generateImage = useCallback(async (prompt: string) => {
    try {
      const response = await fetch(`${config.BASE_URL}/image/flux`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt,
          aspect_ratio: '1:1',
          response_format: 'url',
          save: false,
        }),
      });
      const data = await response.json();
      return data;
    } catch (e) {
      console.log('Error >> ', e);
    }
  }, []);

  const [botTyping, setBotTyping] = useState('');

  const processMessage = useCallback(
    async (messageText: string) => {
      const filteredMessages = messages.filter(
        item => item.role === 'user' || item.role === 'assistant',
      );

      const newMessages: ConversationMessage[] = [
        ...filteredMessages,
        { id: nanoid(), role: 'user', content: messageText },
      ];

      dispatch(addUserMessage(messageText));
      setInput('');
      setLoading(true);

      try {
        const res = await sendMessageToBackend(newMessages);
        const { paragraph: data, schema: actionSchema } =
          splitParagraphAndSchema(res);

        console.log('Parag > ', data);
        console.log('Schema >> ', actionSchema);

        setBotTyping('');
        let idx = 0;

        const typeMessage = async () => {
          idx++;
          setBotTyping(data.slice(0, idx));

          if (idx < data.length) {
            setTimeout(typeMessage, 20);
          } else {
            dispatch(addAssistantMessage(res));
            setBotTyping('');

            if (actionSchema?.intent === 'generate') {
              let requestId: string | undefined;

              try {
                // const { result, requestId: id } = await reserveUsage({
                //   feature: 'images',
                //   amount: 1,
                // });

                // console.log('Reserver result >> ', result);

                // requestId = id;

                // if (result.allowed) {
                  toggleGeneratingImage(true);
                  generateImage(actionSchema.prompt)
                    .then(response => {
                      if (response?.images) {
                        const urls = response.images;
                        dispatch(
                          addMessage({
                            role: 'generate',
                            content: JSON.stringify(urls),
                          }),
                        );
                      }
                    })
                    .catch(e => {
                      showToast('error', ERROR_MESSAGES.IMAGE_GENERATE_ERROR);
                      console.log('Generate image error:', e);
                    })
                    .finally(() => toggleGeneratingImage(false));
                // }
              } catch (e) {
                showToast('error', 'You have exhausted your free usage.');
                dispatch(
                  addMessage({
                    role: 'system',
                    content: JSON.stringify({
                      paragraph: '',
                      actionSchema: {
                        intent: 'subscribe',
                      },
                    }),
                  }),
                );
              }
            }
          }
        };

        typeMessage();
      } catch (error) {
        showToast('error', ERROR_MESSAGES.CHAT_RESPONSE_ERROR);
        console.log('Send message error:', error);
      } finally {
        setLoading(false);
      }
    },
    [messages, dispatch, sendMessageToBackend, generateImage],
  );

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;
    processMessage(input);
  }, [input, processMessage]);

  const handleGenerateImage = useCallback(
    (data: any, id: number) => {
      processMessage(`Generate visuals on outfit ${id}`);
    },
    [processMessage],
  );

  return (
    <Layout>
      <KeyboardAvoidingView
        style={keyboardAvoidingStyle}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 32 : 0}
      >
        <View style={chatContainerStyle}>
          <ChatList
            messages={messages}
            loading={loading}
            botTyping={botTyping}
            generatingImage={generatingImage}
            processMessage={processMessage}
            handleGenerateImage={handleGenerateImage}
          />
          <View style={inputContainerStyle}>
            <TextInput
              style={textInputStyle}
              placeholder="Ask me anything..."
              placeholderTextColor={theme.colors.textSecondaryLight}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleSend}
              spellCheck={true}
              returnKeyType="send"
            />
            <TouchableOpacity
              onPress={handleSend}
              disabled={loading || generatingImage}
            >
              <SendIcon />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default Home;
