import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import ButtonStyled from '../../components/ui/ButtonStyled';
import { logoutUserApi } from '../../services/authApi';

const LogoutScreen = ({ navigation }) => {
  const { logout, token } = useAuth();
  const [fetchedMessage, setFetchedMessage] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Settings',
    });
  }, [navigation]);

  useEffect(() => {
    fetchMessage();
  }, [token]);

  const onPressLogoutHandler = () => {
    logout();
  };

  const fetchMessage = async () => {
    const message = await logoutUserApi(token);
    setFetchedMessage(message);
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>{fetchedMessage}</Text>
      <ButtonStyled onPress={onPressLogoutHandler} text={'Logout'} />
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
