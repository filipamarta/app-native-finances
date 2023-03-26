import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../contants/colors';
import ButtonStyled from './ButtonStyled';

const ErrorOverlay = ({ message, onConfirm }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>An error occurred :(</Text>
      <Text style={styles.message}>{message}</Text>
      {onConfirm && <ButtonStyled onPress={onConfirm} isFlat text="Okay" />}
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 24,
    backgroundColor: Colors.tertiary500,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 10 },
  message: { fontSize: 14, color: 'white', marginBottom: 30 },
});
