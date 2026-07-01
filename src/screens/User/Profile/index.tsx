import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useFirebaseContext } from '../../../utils/hooks/useFirebaseContext';
import { useAppSelector } from '../../../store/hooks';
import { User } from '../../../utils/types/Auth';
import Loader from '../../../styles/components/Loader';
import Layout from '../../../styles/components/Layout';
import { alignItemsCenter, flex1, flexRow } from '../../../styles/mixins';
import theme from '../../../styles/theme';
import Text from '../../../styles/components/Text';
import useAppNavigation from '../../../utils/hooks/useNavigation';

type Tab = 'outfits' | 'likes';

const Profile: React.FC = () => {
  const route = useRoute<any>();
  const { id } = route.params;
  const { user: currentUser } = useAppSelector(state => state.auth);
  const firebase = useFirebaseContext();
  const navigation = useAppNavigation();

  const [userData, setUserData] = useState<User>({});
  const [activeTab, setActiveTab] = useState<Tab>('outfits');
  const [isFollowing, setIsFollowing] = useState(false);

  const isOwnProfile = currentUser?.id === id;

  const fetchUser = useCallback(async () => {
    if (firebase?.getUser && id) {
      const data = await firebase.getUser(id);
      setUserData(data);
    }
  }, [firebase, id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (!userData) {
    return <Loader />;
  }

  return (
    <Layout>
      <View style={styles.container}>
        {/* Header Section */}
        <View
          style={[
            flexRow,
            {
              gap: theme.spacing.small,
              padding: theme.spacing.medium,
            },
            alignItemsCenter,
          ]}
        >
          <Image
            source={
              userData
                ? { uri: userData.profilePhoto }
                : require('../../../assets/images/maleModels/Model1.png')
            }
            style={styles.avatar}
          />
          <View style={[flex1, { paddingVertical: theme.spacing.small }]}>
            <Text
              fontSize={theme.fontSize.large}
              fontWeight={'600'}
              color={theme.colors.textPrimary}
            >
              {userData?.fullName}
            </Text>
            <Text color={theme.colors.textSecondaryLight}>
              {userData?.userName}
            </Text>
          </View>

          {isOwnProfile ? (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('Onboarding')}
            >
              <Text>Edit profile</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.followButton, isFollowing && styles.following]}
              onPress={() => setIsFollowing(prev => !prev)}
            >
              <Text style={{ color: isFollowing ? '#000' : '#fff' }}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <Text
            fontSize={theme.fontSize.medium}
            style={[{ textAlign: 'center' }]}
            fontWeight={'900'}
          >
            127{'\n'}
            <Text fontWeight={'600'} fontSize={theme.fontSize.large}>
              Posts
            </Text>
          </Text>
          <Text
            fontSize={theme.fontSize.medium}
            style={[{ textAlign: 'center' }]}
            fontWeight={'900'}
          >
            1.2K{'\n'}
            <Text fontWeight={'600'} fontSize={theme.fontSize.large}>
              Followers
            </Text>
          </Text>
          <Text
            fontSize={theme.fontSize.medium}
            style={[{ textAlign: 'center' }]}
            fontWeight={'900'}
          >
            465{'\n'}
            <Text fontWeight={'600'} fontSize={theme.fontSize.large}>
              Following
            </Text>
          </Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity onPress={() => setActiveTab('outfits')}>
            <Text
              style={[styles.tab, activeTab === 'outfits' && styles.activeTab]}
            >
              Outfits
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('likes')}>
            <Text
              style={[styles.tab, activeTab === 'likes' && styles.activeTab]}
            >
              Likes
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {activeTab === 'outfits' ? <Text>Outfits</Text> : <Text>Liked</Text>}
        </View>
      </View>
    </Layout>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: theme.spacing.large },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { alignItems: 'center', padding: 16 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  name: { fontSize: 18, fontWeight: 'bold' },
  username: { fontSize: 14, color: '#666' },
  editButton: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 20,
  },
  followButton: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#000',
  },
  following: {
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#000',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    paddingBottom: 20,
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  stat: { textAlign: 'center', fontSize: 14 },
  tabRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  tab: { marginHorizontal: 20, fontSize: 16, color: '#777' },
  activeTab: { color: '#000', fontWeight: 'bold' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
