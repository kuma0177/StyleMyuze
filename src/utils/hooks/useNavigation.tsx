import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types/Navigation';

const useAppNavigation = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return navigation;
}

export default useAppNavigation;