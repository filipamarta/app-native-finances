import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import AuthContent from '../../components/auth/AuthContent';
import ErrorOverlay from '../../components/ui/ErrorOverlay';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import { loginUserApi } from '../../services/authApi';
import { useAuth } from '../../context/AuthContext';

const LoginScreen = () => {
  const { authenticate } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigation = useNavigation();

  const goBack = () => {
    navigation.replace('Login');
  };

  const loginHandler = async (userData) => {
    setIsAuthenticating(true);
    setIsError(false);
    try {
      const { token, refreshToken } = await loginUserApi(userData);
      authenticate(token, refreshToken);
    } catch (error) {
      setIsError(true);
      setIsAuthenticating(false);
    }
  };

  if (isError) {
    return (
      <ErrorOverlay
        message="Your authentication failed. Please check your credentials and try again."
        onConfirm={goBack}
      />
    );
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in!" />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default LoginScreen;
