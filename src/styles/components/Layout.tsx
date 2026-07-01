import React from 'react';
import { flex1 } from '../mixins';
import theme from '../theme';
import Header from './Header';
import { useAppSelector } from '../../store/hooks';
import Loader from './Loader';
import { View } from 'react-native';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { loading } = useAppSelector(state => state.async);

  return (
    <View style={[flex1, { backgroundColor: theme.colors.white }]}>
      {!loading && <Header />}
      {loading ? <Loader /> : children}
    </View>
  );
};

export default Layout;
