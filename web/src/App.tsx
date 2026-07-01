import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import store, { persistor } from './store/store';
import theme from './styles/theme';
import { FirebaseContextProvider } from './utils/context/FirebaseContext';
import useAuthSubscriptions from './utils/hooks/useAuthSubscriptions';
import AppRouter from './navigation/AppRouter';
import ToastProvider from './styles/components/ToastProvider';
import Loader from './styles/components/Loader';

// Mounts the Firebase auth listener inside the context providers
const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useAuthSubscriptions();
  return <>{children}</>;
};

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <FirebaseContextProvider>
            <AuthGate>
              <AppRouter />
              <ToastProvider />
            </AuthGate>
          </FirebaseContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

export default App;
