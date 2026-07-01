import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

export type Role = 'system' | 'generate' | 'assistant' | 'user';

export interface ConversationMessage {
  id: string;
  role: Role;
  content: any;
}

export interface ConversationState {
  messages: ConversationMessage[];
}

const initialState: ConversationState = { messages: [] };

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    addMessage: {
      reducer(state, action: PayloadAction<ConversationMessage>) {
        state.messages.push(action.payload);
      },
      prepare(message: Omit<ConversationMessage, 'id'>) {
        return { payload: { id: nanoid(), ...message } };
      },
    },
    addUserMessage: {
      reducer(state, action: PayloadAction<ConversationMessage>) {
        state.messages.push(action.payload);
      },
      prepare(content: string) {
        return { payload: { id: nanoid(), role: 'user' as Role, content } };
      },
    },
    addAssistantMessage: {
      reducer(state, action: PayloadAction<ConversationMessage>) {
        state.messages.push(action.payload);
      },
      prepare(content: string) {
        return { payload: { id: nanoid(), role: 'assistant' as Role, content } };
      },
    },
    addMessages: {
      reducer(state, action: PayloadAction<ConversationMessage[]>) {
        state.messages.push(...action.payload);
      },
      prepare(messages: Array<Omit<ConversationMessage, 'id'>>) {
        return { payload: messages.map(m => ({ id: nanoid(), ...m })) };
      },
    },
    updateMessage(state, action: PayloadAction<{ id: string; changes: Partial<Omit<ConversationMessage, 'id'>> }>) {
      const idx = state.messages.findIndex(m => m.id === action.payload.id);
      if (idx !== -1) state.messages[idx] = { ...state.messages[idx], ...action.payload.changes };
    },
    removeMessage(state, action: PayloadAction<{ id?: string; index?: number }>) {
      const { id, index } = action.payload;
      if (typeof index === 'number') {
        if (index >= 0 && index < state.messages.length) state.messages.splice(index, 1);
        return;
      }
      if (id) {
        const idx = state.messages.findIndex(m => m.id === id);
        if (idx !== -1) state.messages.splice(idx, 1);
      }
    },
    popLastMessage(state) { state.messages.pop(); },
    replaceConversation(state, action: PayloadAction<ConversationMessage[]>) { state.messages = action.payload; },
    clearConversation(state) { state.messages = []; },
  },
});

export const {
  addMessage, addUserMessage, addAssistantMessage, addMessages,
  updateMessage, removeMessage, popLastMessage, replaceConversation, clearConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer;
export const selectConversation = (s: { conversation: ConversationState }) => s.conversation.messages;
