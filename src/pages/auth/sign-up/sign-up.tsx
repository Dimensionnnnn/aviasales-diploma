import { yupResolver } from '@hookform/resolvers/yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { Controller, useForm } from 'react-hook-form';
import styled, { css } from 'styled-components/native';

import { GuestStackParamList } from '@app/navigation/guest/guest';

import { schema } from '@features/auth/sign-up/schema';

import { FormInput } from '@shared/form-components/inputs/form-input/form-input';
import { useAppDispatch } from '@shared/store/';
import { actions } from '@shared/store/ducks/auth/';
import { PrimaryButton } from '@shared/ui/buttons/primary-button/primary-button';
import { TextButton } from '@shared/ui/buttons/text-button/text-button';

const backgroundImageUrl = require('@shared/ui/assets/images/background-gradient.png');

interface SubmitProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpScreenProps {
  navigation: StackNavigationProp<GuestStackParamList, 'SignUp'>;
}

export const SignUpPage = ({ navigation }: SignUpScreenProps) => {
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const dispatch = useAppDispatch();

  const { isValid } = formState;

  const onSubmit = (dataSubmit: SubmitProps) => {
    dispatch(actions.signUp(dataSubmit));
  };

  const handleSignInNavigate = () => {
    navigation.navigate('SignIn');
  };

  return (
    <StyledContainer>
      <StyledImage source={backgroundImageUrl} resizeMode="cover" />
      <StyledFormContainer>
        <StyledWrapper>
          <StyledTitle>Регистрация</StyledTitle>
          <ControllersContainer>
            <Controller
              control={control}
              name="name"
              render={(renderProps) => <FormInput label="Имя" {...renderProps} />}
            />
            <Controller
              control={control}
              name="email"
              render={(renderProps) => <FormInput label="Почта" {...renderProps} />}
            />
            <Controller
              control={control}
              name="password"
              render={(renderProps) => <FormInput label="Пароль" isPassword {...renderProps} />}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={(renderProps) => (
                <FormInput label="Подтвердите пароль" isPassword {...renderProps} />
              )}
            />
          </ControllersContainer>
          <FooterContainer>
            <PrimaryButton
              title="Зарегистрироваться"
              size="large"
              isDisabled={!isValid}
              onPress={handleSubmit(onSubmit)}
            />
            <FooterWrapper>
              <FooterText>Уже есть аккаунт?</FooterText>
              <TextButton title="Войдите" onPress={handleSignInNavigate} />
            </FooterWrapper>
          </FooterContainer>
        </StyledWrapper>
      </StyledFormContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
  justify-content: flex-end;
`;

const StyledWrapper = styled.ScrollView`
  padding: 36px 24px 40px 24px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-color: ${(props) => props.theme.colors.grayscale_100};
`;

const StyledFormContainer = styled.View`
  justify-content: flex-end;
`;

const ControllersContainer = styled.View`
  gap: 28px;
  padding-bottom: 42px;
`;

const FooterContainer = styled.View`
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const FooterWrapper = styled.View`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const StyledTitle = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.titleBold_28};
      color: ${props.theme.colors.grayscale_800};
      padding-bottom: 28px;
    `;
  }};
`;

const FooterText = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.bodyRegular_16};
      color: ${props.theme.colors.grayscale_700};
    `;
  }};
`;

const StyledImage = styled.Image`
  width: 100%;
  position: absolute;
  top: 0;
`;
