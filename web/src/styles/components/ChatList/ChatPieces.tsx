import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import MyuzeIcon from '../../../assets/icons/Myuze';
import { splitParagraphAndSchema } from '../../../utils/const/splitPara&Json';
import CustomImage from '../Image';
import Button from '../Button';
import theme from '../../theme';

// --- User bubble ---
const UserWrap = styled.div`
  align-self: flex-end;
  margin: 6px 16px 6px 72px;
`;
const UserBubbleBox = styled.div`
  background: #2972FF;
  border-radius: 16px;
  padding: 12px 16px;
  color: #fff;
  font-size: 14px;
  line-height: 1.5;
`;
export const UserBubble = memo(({ text }: { text: string }) => (
  <UserWrap><UserBubbleBox>{text}</UserBubbleBox></UserWrap>
));

// --- Assistant bubble ---
const AssistantWrap = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin: 6px 72px 6px 16px;
`;
const AssistantContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const AssistantBox = styled.div`
  background: #F6F7F9;
  border-radius: 16px;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.5;
  color: ${() => theme.colors.gray900};
`;
const OutfitBox = styled.div`
  background: #F6F7F9;
  border-radius: 16px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const OutfitName = styled.span`
  font-weight: 500;
  color: ${() => theme.colors.primary};
  font-size: 14px;
`;
const OutfitDesc = styled.p`
  font-size: 13px;
  color: ${() => theme.colors.gray900};
  line-height: 1.5;
`;

export const AssistantBubble = memo(({
  text, handleGenerate,
}: { text: string; handleGenerate?: (data: any, id: number) => void }) => {
  const { paragraph, schema: actionSchema } = useMemo(() => splitParagraphAndSchema(text), [text]);
  const looks = actionSchema?.intent === 'styling_request' && Array.isArray(actionSchema?.looks)
    ? actionSchema.looks : [];

  return (
    <AssistantWrap>
      <MyuzeIcon />
      <AssistantContent>
        <AssistantBox>{paragraph}</AssistantBox>
        {looks.length > 0 && (
          <OutfitBox>
            {looks.map((look: any, idx: number) => (
              <div key={`${look.name}-${idx}`} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <OutfitName>Outfit {idx + 1}: {look.name}</OutfitName>
                <OutfitDesc>- {(look.items || []).map((i: any) => i.desc).join('\n- ')}</OutfitDesc>
                {handleGenerate && (
                  <Button buttonType="ghost" title="Generate visuals" onPress={() => handleGenerate(look, idx + 1)} />
                )}
              </div>
            ))}
          </OutfitBox>
        )}
      </AssistantContent>
    </AssistantWrap>
  );
});

// --- Images ---
const ImageGrid = styled.div`
  display: flex;
  gap: 10px;
`;
export const RenderImage = memo(({ content }: { content: string | string[] }) => {
  const urls = useMemo(() => {
    if (Array.isArray(content)) return content;
    try { const p = JSON.parse(content); return Array.isArray(p) ? p : []; }
    catch { return []; }
  }, [content]);

  return (
    <ImageGrid>
      {urls.map((url, idx) => (
        <CustomImage
          key={url || `img-${idx}`}
          url={url || null}
          width={140}
          height={140}
          borderRadius={16}
          overlayButton={url ? (
            <Button
              title="Try now"
              style={{ width: 100, height: 32, background: '#fff' }}
              buttonTextStyle={{ color: theme.colors.textPrimary, fontSize: 13 }}
            />
          ) : undefined}
        />
      ))}
    </ImageGrid>
  );
});

// --- Empty state ---
const EmptyWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 32px;
`;
const EmptyTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${() => theme.colors.textPrimary};
  text-align: center;
`;
const EmptySub = styled.p`
  font-size: 14px;
  color: ${() => theme.colors.textSecondaryLight};
`;
export const EmptyState = memo(() => (
  <EmptyWrap>
    <EmptyTitle>How can I help you{'\n'}today? 👋</EmptyTitle>
    <EmptySub>Ask Myuze for outfit ideas</EmptySub>
  </EmptyWrap>
));

// --- System / subscribe message ---
const SysAssistantWrap = styled(AssistantWrap)``;
const SysBox = styled(AssistantBox)``;
export const SystemMessage = memo(({ processMessage }: { processMessage: (m: string) => void }) => (
  <SysAssistantWrap>
    <MyuzeIcon />
    <AssistantContent>
      <SysBox>{"Whoa, style superstar — you've maxed out your free creative sparks for today!"}</SysBox>
      <SysBox>
        {"On the free plan, you get:\n✨ 5 image prompts/day\n🎥 1 video/day\n\nBut why stop there? Go "}
        <strong>Premium</strong>{" to unlock:\n🚀 50 images/day\n🎬 10 videos/day"}
      </SysBox>
      <SysBox style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {"All for just "}<strong>$5/month</strong>{" or "}<strong>$1.25/week</strong>
        {"\n\nSubscribe now and keep your fashion magic flowing! ✨"}
        <Button buttonType="primary" title="Upgrade and keep styling" onPress={() => {}} />
        <Button buttonType="ghost" title="I will wait until tomorrow" onPress={() => processMessage('Wait till tomorrow')} />
      </SysBox>
    </AssistantContent>
  </SysAssistantWrap>
));
