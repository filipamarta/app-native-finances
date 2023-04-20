import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import Colors from '../../contants/colors';

const LoadingOverlay = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <ActivityIndicator size={'large'} color="white" />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary700,
  },
});
