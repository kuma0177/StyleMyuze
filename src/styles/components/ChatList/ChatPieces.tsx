import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { memoizedStyles } from './chatStyles';
import Text from '../Text';
import { splitParagraphAndSchema } from '../../../utils/const/splitPara&Json';
import theme from '../../theme';
import Myuze from '../../../assets/icons/Myuze';
import CustomButton from '../Button';
import CustomImage from '../Image';
import { alignItemsCenter, flex1, flexCenter, flexColumn } from '../../mixins';

// User bubble
export const UserBubble = memo(({ text }: { text: string }) => (
  <View style={memoizedStyles.userBubbleContainer}>
    <View style={memoizedStyles.userBubble}>
      <Text style={memoizedStyles.userBubbleText}>{text}</Text>
    </View>
  </View>
));

// Assistant bubble with outfits
export const AssistantBubble = memo(
  ({
    text,
    handleGenerate,
  }: {
    text: string;
    handleGenerate?: (data: any, id: number) => void;
  }) => {
    const parsedContent = useMemo(() => {
      const { paragraph, schema: actionSchema = {} } =
        splitParagraphAndSchema(text);
      const contentToShow =
        actionSchema?.intent === 'styling_request'
          ? Array.isArray(actionSchema?.looks)
            ? actionSchema.looks
            : []
          : [];
      return { paragraph, actionSchema, contentToShow };
    }, [text]);

    return (
      <View style={memoizedStyles.assistantBubbleContainer}>
        <Myuze />
        <View style={memoizedStyles.assistantBubbleWidth}>
          <View style={memoizedStyles.assistantBubble}>
            <Text style={{ color: theme.colors.gray900 }}>
              {parsedContent.paragraph}
            </Text>
          </View>
          {parsedContent.actionSchema?.intent === 'styling_request' &&
            parsedContent.contentToShow?.length > 0 && (
              <View
                style={[
                  memoizedStyles.outfitContainer,
                  memoizedStyles.assistantBubble,
                ]}
              >
                {parsedContent.contentToShow.map((cont: any, ind: number) => {
                  const subTitle =
                    cont.items?.map((i: { desc: string }) => i.desc) || [];
                  return (
                    <View
                      key={`cont-${cont.name}-${ind}`}
                      style={{ gap: theme.spacing.small }}
                    >
                      <Text color={theme.colors.primary} fontWeight={'500'}>
                        Outfit {ind + 1}: {cont.name}
                      </Text>
                      <Text color={theme.colors.gray900}>
                        - {subTitle.join('\n- ')}
                      </Text>
                      {handleGenerate && (
                        <CustomButton
                          buttonType="ghost"
                          title="Generate visuals"
                          onPress={() => handleGenerate(cont, ind + 1)}
                        />
                      )}
                    </View>
                  );
                })}
              </View>
            )}
        </View>
      </View>
    );
  },
);

// Images
export const RenderImage = memo(
  ({ content }: { content: string | string[] }) => {
    const urls = useMemo(() => {
      if (Array.isArray(content))
        return content.filter((u): u is string => typeof u === 'string');
      if (typeof content === 'string') {
        try {
          const parsed = JSON.parse(content);
          return Array.isArray(parsed)
            ? parsed.filter((u: unknown): u is string => typeof u === 'string')
            : [];
        } catch {
          return [];
        }
      }
      return [];
    }, [content]);

    if (urls.length === 0) return null;

    return (
      <View style={memoizedStyles.imageContainer}>
        {urls.map((url, idx) => (
          <CustomImage
            key={url || `img-${idx}`}
            height={140}
            width={140}
            borderRadius={16}
            url={url}
            overlayButton={
              <CustomButton
                style={[
                  {
                    height: theme.height.height1 * 40,
                    width: theme.width.width100,
                    backgroundColor: theme.colors.white,
                  },
                ]}
                buttonTextStyle={[
                  {
                    color: theme.colors.textPrimary,
                  },
                ]}
                title={url ? 'Try now': ''}
              />
            }
          />
        ))}
      </View>
    );
  },
);

// Empty state
export const EmptyState = memo(() => (
  <View style={[flex1, flexCenter]}>
    <View
      style={[flexColumn, alignItemsCenter, memoizedStyles.emptyStateContainer]}
    >
      <Text fontSize={theme.fontSize.xLarge} fontWeight="600">
        How can I help you
      </Text>
      <Text fontSize={theme.fontSize.xLarge} fontWeight="600">
        today? 👋
      </Text>
      <Text color={theme.colors.textSecondaryLight}>
        Ask Myuze for outfit ideas
      </Text>
    </View>
  </View>
));

export const SubscribeModel = ({
  processMessage,
}: {
  processMessage: (msg: string) => void;
}) => {
  return (
    <View style={memoizedStyles.assistantBubbleContainer}>
      <Myuze />
      <View style={memoizedStyles.assistantBubbleWidth}>
        <View style={memoizedStyles.assistantBubble}>
          <Text style={{ color: theme.colors.gray900 }}>
            {`Whoa, style superstar — you've maxed out your free creative sparks for today!`}
          </Text>
        </View>

        <View style={memoizedStyles.assistantBubble}>
          <Text style={{ color: theme.colors.gray900 }}>
            On the free plan, you get:
            {'\n'}✨ 5 image prompts/day
            {'\n'}🎥 1 video/day
            {'\n\n'}But why stop there? Go{' '}
            <Text fontWeight={'800'}>Premium</Text> to unlock:
            {'\n'}🚀 50 images/day
            {'\n'}🎬 10 videos/day
          </Text>
        </View>

        <View style={memoizedStyles.assistantBubble}>
          <Text
            style={{
              color: theme.colors.gray900,
              marginBottom: theme.spacing.medium,
            }}
          >
            All for just <Text fontWeight={'800'}>$5/month</Text> or{' '}
            <Text fontWeight={'800'}>$1.25/week</Text>
            {'\n\n'}Subscribe now and keep your fashion magic flowing! ✨
          </Text>

          <View style={{ gap: theme.spacing.medium }}>
            <CustomButton
              buttonType="primary"
              title="Upgrade and keep styling"
              onPress={() => {
                console.log('upgrade button pressed');
                // Add your upgrade logic here
              }}
            />
            <CustomButton
              buttonType="ghost"
              title="I will wait until tomorrow"
              onPress={() => {
                console.log('wait button pressed');
                processMessage('Wait till tomorrow');
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
