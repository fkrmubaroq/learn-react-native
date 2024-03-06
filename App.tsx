import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Flexbox from 'components/Lesson/Flexbox';
import Image from 'components/Lesson/Image';
import RelativeAbsolute from 'components/Lesson/RelativeAbsolute';
import React from 'react';
import Home from './Home';
import {RootStackParamList} from './types';

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
];

const Stack = createNativeStackNavigator<RootStackParamList>();
function App(): React.JSX.Element {
  return (
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
  );
}

export default App;
