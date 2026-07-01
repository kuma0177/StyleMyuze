import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Loader from './Loader';
import { useAppSelector } from '../../store/hooks';

const Wrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  overflow: hidden;
  position: relative;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading } = useAppSelector(state => state.async);

  return (
    <Wrap>
      {!loading && <Header />}
      <Content>
        {loading ? <Loader /> : children}
      </Content>
    </Wrap>
  );
};

export default Layout;
