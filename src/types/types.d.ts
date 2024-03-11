export type RootStackParamList = {
  Home: undefined;
  Flexbox: undefined;
  'Relative & Absolute': undefined;
  Image: undefined;
  'Todo List': undefined;
  Form: undefined;
};

export type DataTodoType = {
  id: number;
  text: string;
};

export type FormInputType = {
  value: string;
  onChangeText: (text: string) => void;
};

export type DataOptionType = {
  value: number;
  text: string;
};
