import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from './types/types';

const lessonMenus: (keyof RootStackParamList)[] = [
  'Flexbox',
  'Relative & Absolute',
  'Image',
  'Todo List',
];

export default function Home({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  return (
    <ScrollView style={{flex: 1, columnGap: 10}}>
      <View style={styles.container}>
        <Text style={{textAlign: 'center', fontWeight: '700', fontSize: 20}}>
          React Native Lessons
        </Text>
        {lessonMenus.map((menu, key) => (
          <Button
            title={menu}
            key={key}
            onPress={() => navigation.navigate(menu)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
    padding: 15,
  },
  menu: {
    backgroundColor: '#655',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 7,
  },
  menuText: {
    color: 'white',
  },
});
