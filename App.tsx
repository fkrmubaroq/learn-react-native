import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import Home from './Home';
import Flexbox from './Lesson/Flexbox';
import RelativeAbsolute from './Lesson/RelativeAbsolute';
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
