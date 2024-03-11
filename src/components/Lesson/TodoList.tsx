import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {closeIcon} from 'src/lib/icons';
import {DataTodoType} from 'types/types';

const dataTodo: DataTodoType[] = [
  {
    id: 1,
    text: 'Buy Coffe',
  },
  {
    id: 2,
    text: 'Create App with react native',
  },
];
export default function TodoList() {
  const [todos, setTodos] = useState<DataTodoType[]>(dataTodo);
  const onPressAdd = (text: string) => {
    setTodos(state => [
      ...state,
      {
        id: state.length + 1,
        text,
      },
    ]);
  };

  const onDeleteItem = (selected: DataTodoType) => {
    setTodos(state => state.filter(item => item.id !== selected.id));
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: '#e9ecef'}}>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={todos}
          renderItem={({item}) => (
            <TodoItem data={item} onDeleteItem={onDeleteItem} />
          )}
          contentContainerStyle={styles.containerTodoList}
          style={{marginBottom: 60}}
        />
        <TodoInput onPressAdd={onPressAdd} />
      </View>
    </>
  );
}

function TodoInput({onPressAdd}: {onPressAdd: (text: string) => void}) {
  const [text, setText] = React.useState('');
  return (
    <View style={styles.containerTodoInput}>
      <TextInput
        autoFocus
        autoCapitalize="words"
        defaultValue={text}
        onChangeText={value => setText(value)}
        style={styles.todoInput}
        placeholder="What needs to be done"
      />
      <TouchableOpacity
        style={[styles.buttonAdd, {opacity: text ? 1 : 0.5}]}
        disabled={!text}
        onPress={() => {
          onPressAdd(text);
          setText('');
        }}>
        <Text style={styles.buttonAddText}>ADD</Text>
      </TouchableOpacity>
    </View>
  );
}
function TodoItem({
  data,
  onDeleteItem,
}: {
  data: DataTodoType;
  onDeleteItem: (selected: DataTodoType) => void;
}) {
  return (
    <View style={styles.containerTodoItem}>
      <Text style={styles.headerText}>{data.text}</Text>
      <TouchableOpacity
        style={styles.buttonClose}
        onPress={() => onDeleteItem(data)}>
        <Image source={closeIcon} style={styles.closeIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerTodoInput: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
    flex: 1,
    left: 0,
    right: 0,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
  buttonAdd: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212529',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  buttonAddText: {
    color: 'white',
    fontWeight: '600',
  },
  todoInput: {
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    fontSize: 12,
    height: 40,
    flex: 1,
  },
  containerTodoList: {
    rowGap: 10,
    padding: 10,
  },
  containerTodoItem: {
    backgroundColor: 'orange',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 7,
  },
  headerText: {
    color: 'white',
  },
  buttonClose: {
    justifyContent: 'center',
  },
  closeIcon: {
    width: 13,
    height: 13,
  },
});
