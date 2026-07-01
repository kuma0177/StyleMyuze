import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../styles/components/Layout';
import Button from '../../../styles/components/Button';
import { useAppSelector } from '../../../store/hooks';

const Page = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const AvatarWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Avatar = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
`;

const AvatarPlaceholder = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gray200};
`;

const Name = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Username = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondaryLight};
`;

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const Label = styled.span`color: ${({ theme }) => theme.colors.textSecondaryLight};`;
const Value = styled.span`color: ${({ theme }) => theme.colors.textPrimary}; font-weight: 500;`;

const Profile: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  return (
    <Layout>
      <Page>
        <AvatarWrap>
          {user?.profilePhoto
            ? <Avatar src={user.profilePhoto} alt="profile" />
            : <AvatarPlaceholder />
          }
        </AvatarWrap>
        <div>
          <Name>{user?.fullName}</Name>
          <Username>@{user?.userName}</Username>
        </div>
        <Card>
          <Row><Label>Gender</Label><Value>{user?.gender ?? '—'}</Value></Row>
          <Row><Label>Age</Label><Value>{user?.age ?? '—'}</Value></Row>
          <Row><Label>Clothing size</Label><Value>{user?.clothingSize?.toUpperCase() ?? '—'}</Value></Row>
          <Row><Label>Skin tone</Label>
            <Value>
              {user?.skinTone
                ? <span style={{ display: 'inline-block', width: 20, height: 20, borderRadius: '50%', background: user.skinTone, border: '1px solid #ccc' }} />
                : '—'
              }
            </Value>
          </Row>
          <Row><Label>Body shape</Label><Value>{user?.bodyShape ?? '—'}</Value></Row>
        </Card>
        {user?.preferredStyles && user.preferredStyles.length > 0 && (
          <Card>
            <Label>Preferred styles</Label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {user.preferredStyles.map(s => (
                <span key={s} style={{ padding: '4px 10px', borderRadius: 20, background: '#F6F7F9', fontSize: 13 }}>{s}</span>
              ))}
            </div>
          </Card>
        )}
        <Button buttonType="outline" title="Edit profile" onPress={() => navigate('/onboarding?step=0')} />
      </Page>
    </Layout>
  );
};

export default Profile;
