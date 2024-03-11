import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from './types/types';

const lessonMenus: (keyof RootStackParamList)[] = [
  'Flexbox',
  'Relative & Absolute',
  'Image',
  'Todo List',
  'Form',
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
          <TouchableOpacity
            style={styles.menu}
            key={key}
            onPress={() => navigation.navigate(menu)}>
            <Text style={styles.menuText}>{menu}</Text>
          </TouchableOpacity>
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
    backgroundColor: '#3a86ff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 7,
  },
  menuText: {
    textAlign: 'center',
    color: 'white',
  },
});
