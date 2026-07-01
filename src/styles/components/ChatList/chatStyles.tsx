// src/components/chat/chatStyles.ts
import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const memoizedStyles = StyleSheet.create({
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
    gap: 8,
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
