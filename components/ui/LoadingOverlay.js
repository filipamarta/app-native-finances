import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../../contants/colors';

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
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
