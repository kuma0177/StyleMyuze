import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../../styles/components/Layout';
import Button from '../../../styles/components/Button';
import TitleHeader from '../../../styles/components/TitleHeader';
import CustomInput from '../../../styles/components/Input';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { populateUser } from '../../../store/slices/AuthSlice';
import { setError, clearError, startLoading, stopLoading } from '../../../store/slices/Async';
import { useFirebaseContext } from '../../../utils/hooks/useFirebaseContext';
import { getMissingUserFields } from '../../../utils/const/helpers/validate';
import { showToast } from '../../../utils/const/helpers/toast';
import { ERROR_MESSAGES } from '../../../utils/const/helpers/errorMessages';
import { formTypeTitles, maleStyleData, femaleStyleData, maleBodyTypes, femaleBodyTypes } from '../../../constants/data';
import { User } from '../../../utils/types/Auth';

const Page = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  -webkit-overflow-scrolling: touch;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 24px 32px;
  flex-shrink: 0;
`;

const StyleGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyleCard = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  border: 1.5px solid ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.border)};
  background: ${({ $selected, theme }) => ($selected ? `${theme.colors.primary}08` : '#fff')};
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s;
`;

const StyleLabel = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 2px;
`;

const StyleDesc = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondaryLight};
  line-height: 1.4;
`;

const REQUIRED_FIELDS: Record<number, string[]> = {
  0: ['fullName', 'userName', 'gender', 'dateOfBirth'],
  1: ['skinTone', 'clothingSize'],
  2: [],
  3: [],
};

const CLOTHING_SIZES = [
  { value: 'xs', label: 'XS' }, { value: 's', label: 'S' }, { value: 'm', label: 'M' },
  { value: 'l', label: 'L' }, { value: 'xl', label: 'XL' }, { value: 'xxl', label: 'XXL' },
];

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { error } = useAppSelector(state => state.async);
  const { updateUser, uploadToCloudinary, localState, setLocalState } = useFirebaseContext();

  const stepFromUrl = Number(new URLSearchParams(location.search).get('step') ?? 0);
  const [step, setStep] = useState(stepFromUrl);
  const formType = formTypeTitles[step];
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => { topRef.current?.scrollTo(0, 0); }, [step]);

  const handleChange = useCallback((key: string, value: any) => {
    if (key === 'gender') dispatch(populateUser({ preferredStyles: [], bodyShape: '' }));
    dispatch(populateUser({ [key]: value } as Partial<User>));
  }, [dispatch]);

  const handleImageFile = useCallback((url: string) => {
    setLocalState(s => ({ ...s, localProfilePhoto: url }));
  }, [setLocalState]);

  const validate = useCallback((fields: string[]) => {
    const missing = getMissingUserFields(user || {}, fields);
    if (missing.length) { dispatch(setError(Object.fromEntries(missing.map(k => [k, true])))); return false; }
    dispatch(clearError());
    return true;
  }, [user, dispatch]);

  const handleNext = useCallback(async () => {
    const ok = validate(REQUIRED_FIELDS[step] ?? []);
    const profileUri = localState.localProfilePhoto as string | undefined;
    const hasPhoto = profileUri || user?.profilePhoto;

    if (!ok || (step === 1 && !hasPhoto)) {
      showToast('error', ERROR_MESSAGES.REQUIRED_FIELDS);
      return;
    }

    if (step === formTypeTitles.length - 1) {
      dispatch(startLoading());
      try {
        let finalPhoto = user?.profilePhoto;
        if (profileUri && profileUri.startsWith('blob:')) {
          const result = await uploadToCloudinary({ uri: profileUri, uploadPreset: 'prince8320@', folder: 'myuze/users' });
          finalPhoto = result.secure_url;
        }
        const updatedUser = { ...user, profilePhoto: finalPhoto, isNew: false };
        dispatch(populateUser(updatedUser));
        await updateUser(String(user?.id), updatedUser);
        navigate('/', { replace: true });
      } catch {
        showToast('error', 'Something went wrong. Please try again.');
      } finally {
        dispatch(stopLoading());
      }
      return;
    }

    setStep(s => s + 1);
    navigate(`/onboarding?step=${step + 1}`, { replace: true });
  }, [step, validate, user, localState, uploadToCloudinary, updateUser, dispatch, navigate]);

  const handleBack = useCallback(() => {
    if (step === 0) { navigate('/'); return; }
    setStep(s => s - 1);
    navigate(`/onboarding?step=${step - 1}`, { replace: true });
  }, [step, navigate]);

  const styleData = user?.gender === 'female' ? femaleStyleData : maleStyleData;
  const bodyTypes = user?.gender === 'female' ? femaleBodyTypes : maleBodyTypes;

  const toggleStyle = (val: string) => {
    const current = user?.preferredStyles ?? [];
    const next = current.includes(val) ? current.filter(s => s !== val) : current.length < 3 ? [...current, val] : current;
    dispatch(populateUser({ preferredStyles: next }));
  };

  const renderForm = () => {
    switch (step) {
      case 0:
        return (
          <StyleGrid>
            <CustomInput formKey="fullName" type="text" label="Full name" required value={user?.fullName ?? ''} onChange={handleChange} error={error?.fullName} inputProps={{ placeholder: 'Enter full name' }} />
            <CustomInput formKey="userName" type="text" label="Username" required value={user?.userName ?? ''} onChange={handleChange} error={error?.userName} inputProps={{ placeholder: 'Enter username' }} />
            <CustomInput formKey="gender" type="checkbox" label="Gender" required value={user?.gender ?? ''} onChange={handleChange} error={error?.gender} options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} />
            <CustomInput formKey="dateOfBirth" type="date" label="Date of birth" required value={user?.dateOfBirth ?? ''} onChange={handleChange} error={error?.dateOfBirth} />
          </StyleGrid>
        );
      case 1:
        return (
          <StyleGrid>
            <CustomInput formKey="profilePhoto" type="imagepicker" label="Profile photo" required value={user?.profilePhoto ?? ''} onChange={handleChange} />
            <CustomInput formKey="skinTone" type="color" label="Skin tone" required value={user?.skinTone ?? ''} onChange={handleChange} error={error?.skinTone} />
            <CustomInput formKey="clothingSize" type="checkbox" label="Clothing size" required value={user?.clothingSize ?? ''} onChange={handleChange} error={error?.clothingSize} options={CLOTHING_SIZES} />
          </StyleGrid>
        );
      case 2:
        return (
          <StyleGrid>
            {styleData.map(s => (
              <StyleCard key={s.value} $selected={(user?.preferredStyles ?? []).includes(s.value)} onClick={() => toggleStyle(s.value)}>
                <div>
                  <StyleLabel>{s.value}</StyleLabel>
                  <StyleDesc>{s.desc}</StyleDesc>
                </div>
              </StyleCard>
            ))}
          </StyleGrid>
        );
      case 3:
        return (
          <StyleGrid>
            {bodyTypes.map(b => (
              <StyleCard key={b.value} $selected={user?.bodyShape === b.value} onClick={() => dispatch(populateUser({ bodyShape: b.value }))}>
                <div>
                  <StyleLabel>{b.value}</StyleLabel>
                  <StyleDesc>{b.desc}</StyleDesc>
                </div>
              </StyleCard>
            ))}
          </StyleGrid>
        );
      default: return null;
    }
  };

  return (
    <Layout>
      <Page ref={topRef}>
        {user?.isNew && <TitleHeader title={formType.title} subTitle={formType.subTitle} />}
        {renderForm()}
      </Page>
      <Bottom>
        <Button buttonType="primary" title={step === formTypeTitles.length - 1 ? 'Save' : 'Continue'} onPress={handleNext} />
        {(step > 0 || !user?.isNew) && (
          <Button buttonType="secondary" title="Cancel" onPress={handleBack} />
        )}
      </Bottom>
    </Layout>
  );
};

export default Onboarding;
