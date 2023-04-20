import React, { useState } from 'react';
import AuthContent from '../../components/auth/AuthContent';
import { createUserApi } from '../../services/authApi';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import ErrorOverlay from '../../components/ui/ErrorOverlay';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

const SignupScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isError, setIsError] = useState(false);
  const { authenticate } = useAuth();

  const navigation = useNavigation();

  const goBack = () => {
    navigation.replace('Signup');
  };

  const signupHandler = async (userData) => {
    setIsError(false);
    setIsAuthenticating(true);
    try {
      const { token, refreshToken } = await createUserApi(userData);
      authenticate(token, refreshToken);
    } catch (error) {
      setIsError(true);
    }
    setIsAuthenticating(false);
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user" />;
  }

  if (isError) {
    return (
      <ErrorOverlay
        message="Your authentication failed. Please check your credentials and try again."
        onConfirm={goBack}
      />
    );
  }

  return <AuthContent onAuthenticate={signupHandler} />;
};

export default SignupScreen;
