import { View } from "react-native";
import Text from "./Text";
import { useTheme } from "styled-components";
import { flexCenter } from "../mixins";

interface TitleHeaderProps {
  title: string;
  subTitle: string;
}

const TitleHeader: React.FC<TitleHeaderProps> = ({ title, subTitle }) => {
    const theme = useTheme();
  return (
    <View style={[flexCenter, { gap: theme.spacing.small, paddingHorizontal: theme.spacing.medium }]}>
      <Text
        fontSize={theme.fontSize.xLarge}
        fontWeight={'600'}
        color={theme.colors.textPrimary}
      >
        {title}
      </Text>
      <Text color={theme.colors.textSecondaryLight} style={[{textAlign: 'center'}]}>{subTitle}</Text>
    </View>
  );
};

export default TitleHeader;