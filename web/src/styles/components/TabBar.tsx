import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '../../assets/icons/Home';
import LookBookIcon from '../../assets/icons/LookBook';
import DiscoverIcon from '../../assets/icons/Discover';

const Bar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 64px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  flex-shrink: 0;
  padding-bottom: env(safe-area-inset-bottom, 0);
`;

const Tab = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex: 1;
  height: 100%;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : '#7E7D90')};
  font-size: 11px;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  &:active { opacity: 0.7; }
`;

const TABS = [
  { path: '/', label: 'Home', Icon: HomeIcon },
  { path: '/lookbook', label: 'Lookbook', Icon: LookBookIcon },
  { path: '/discover', label: 'Discover', Icon: DiscoverIcon },
];

const TabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Bar>
      {TABS.map(({ path, label, Icon }) => {
        const active = location.pathname === path;
        const color = active ? '#030318' : '#7E7D90';
        return (
          <Tab key={path} $active={active} onClick={() => navigate(path)}>
            <Icon color={color} />
            <span>{label}</span>
          </Tab>
        );
      })}
    </Bar>
  );
};

export default TabBar;
