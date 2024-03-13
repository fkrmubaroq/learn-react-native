import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Flexbox from 'components/Lesson/Flexbox';
import Form from 'components/Lesson/Form';
import Image from 'components/Lesson/Image';
import Modal from 'components/Lesson/Modal';
import RelativeAbsolute from 'components/Lesson/RelativeAbsolute';
import TodoList from 'components/Lesson/TodoList';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import RefreshControl from 'src/components/Lesson/RefreshControl';
import Home from './Home';
import {RootStackParamList} from './types/types';

const lessonMenus: {
  title: keyof RootStackParamList;
  component: (stack: NativeStackScreenProps<RootStackParamList>) => JSX.Element;
}[] = [
  {
    title: 'Home',
    component: Home,
  },
  {
    title: 'Flexbox',
    component: Flexbox,
  },
  {
    title: 'Relative & Absolute',
    component: RelativeAbsolute,
  },
  {
    title: 'Image',
    component: Image,
  },
  {
    title: 'Todo List',
    component: TodoList,
  },
  {
    title: 'Form',
    component: Form,
  },
  {
    title: 'Modal',
    component: Modal,
  },
  {
    title: 'Refresh Control',
    component: RefreshControl,
  },
];

const Stack = createNativeStackNavigator<RootStackParamList>();
function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {lessonMenus.map((menu, key) => (
            <Stack.Screen
              key={key}
              name={menu.title}
              component={menu.component}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
