import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 40,
    justifyContent: 'center',
  },
});
export default function HeaderIos() {
  return (
    <View style={styles.container}>
      <Text style={{textAlign: 'center'}}>Header Ios</Text>
    </View>
  );
}
