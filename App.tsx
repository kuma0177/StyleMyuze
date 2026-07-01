import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import store, { persistor } from './src/store/store';
import theme from './src/styles/theme';
import AppNavigator from './src/navigation/AppNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import { FirebaseContextProvider } from './src/utils/context/FirebaseContext';
import AuthSubscriptions from './src/styles/components/AuthSubscriptions';
import ToastProvider from './src/store/ToastProvider';
import { StatusBar } from 'react-native';
import { flex1 } from './src/styles/mixins';

function App() {
  return (
    <GestureHandlerRootView>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <SafeAreaProvider>
              <FirebaseContextProvider>
                <StatusBar
                  backgroundColor={theme.colors.background}
                  barStyle="dark-content"
                  translucent={false}
                />
                <AuthSubscriptions />
                <SafeAreaView style={[flex1]} edges={['top', 'bottom']}>
                  <AppNavigator />
                  <ToastProvider />
                </SafeAreaView>
              </FirebaseContextProvider>
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
