import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/AuthSlice';
import { clearConversation } from '../../store/slices/ConversationSlice';
import { startLoading, stopLoading } from '../../store/slices/Async';
import { useFirebaseContext } from '../../utils/hooks/useFirebaseContext';
import RightArrowIcon from '../../assets/icons/RightArrow';
import LogOutIcon from '../../assets/icons/LogOut';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
`;

const ProfileCard = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 12px;
  background: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.gray200};
`;

const AvatarPlaceholder = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gray200};
  flex-shrink: 0;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Username = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondaryLight};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textDrawer};
  &:active { opacity: 0.7; }
`;

const MenuLabel = styled.span`
  flex: 1;
  text-align: left;
`;

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: 200px;
  padding: 0 16px;
  height: 44px;
  background: none;
  cursor: pointer;
  margin-top: auto;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.error};
`;

const menuItems = [
  { label: 'Fit preferences', path: '/fit-preferences' },
  { label: 'Try on history', path: '/try-on-history' },
  { label: 'Privacy policy', path: '/privacy-policy' },
  { label: 'Help & support', path: '/help-support' },
];

const Drawer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { googleSignOut } = useFirebaseContext();

  const go = (path: string) => { navigate(path); onClose(); };

  const handleLogout = async () => {
    dispatch(startLoading());
    try {
      await googleSignOut();
      dispatch(clearConversation());
      dispatch(logout());
    } catch {}
    finally { dispatch(stopLoading()); }
    onClose();
  };

  return (
    <Wrap>
      <ProfileCard onClick={() => go('/profile')}>
        {user?.profilePhoto
          ? <Avatar src={user.profilePhoto} alt="profile" />
          : <AvatarPlaceholder />
        }
        <div style={{ flex: 1 }}>
          <Name>{user?.fullName}</Name>
          <Username>@{user?.userName}</Username>
        </div>
        <RightArrowIcon />
      </ProfileCard>

      <Divider />

      <div>
        {menuItems.map((item, i) => (
          <React.Fragment key={item.path}>
            <MenuItem onClick={() => go(item.path)}>
              <MenuLabel>{item.label}</MenuLabel>
              <RightArrowIcon />
            </MenuItem>
            {i < menuItems.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>

      <LogoutBtn onClick={handleLogout}>
        <LogOutIcon />
        <span style={{ flex: 1, textAlign: 'left' }}>Log out</span>
        <RightArrowIcon fill="#E5484D" />
      </LogoutBtn>
    </Wrap>
  );
};

export default Drawer;
