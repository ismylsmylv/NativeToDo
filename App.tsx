import {Button} from 'react-native';
// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import styles from './styles';
function formatDateToDayMonth(timestamp: string | number | Date) {
  // Convert timestamp to milliseconds by multiplying by 1000
  const date = new Date(timestamp); // Assuming the timestamp is in seconds

  // Array of month names
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Get the day and month components of the date
  const day = date.getDate();
  const monthIndex = date.getMonth();

  // Construct the formatted date string
  const formattedDate = `${day} ${monthNames[monthIndex]}`;

  return formattedDate;
}

function App(): React.JSX.Element {
  let STORAGE_KEY = '@user_input';
  const saveData = async todoInput => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todoInput));
      alert('Data successfully saved' + JSON.stringify(todoInput));
    } catch (e) {
      alert('Failed to save the data to the storage');
    }
  };
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);

      if (value !== null) {
        const parsedValue = JSON.parse(value);
        setstored([JSON.stringify(parsedValue)]);
        settodos([JSON.stringify(parsedValue)]);
        alert(JSON.stringify(parsedValue), 'saved');
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  const [input, setinput] = useState('');
  const [todos, settodos] = useState([] as object | string | any);
  const [completedCount, setcompletedCount] = useState(0);
  const [remainCount, setremainCount] = useState(0);
  const [stored, setstored] = useState('');

  useEffect(() => {
    readData();
    // todos &&
    //   todos.map((elem: {completed: boolean}) => {
    //     elem.completed
    //       ? setcompletedCount(completedCount + 1)
    //       : setremainCount(remainCount + 1);
    //   });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#4260f5"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
      <ScrollView style={styles.back}>
        <Text style={{backgroundColor: 'red', color: 'white'}}>
          {stored && stored}stored
        </Text>
        <View style={styles.backgroundContainer}>
          <View
            style={styles.imageHero}
            // source={require('./img/background4.png')}
          >
            <Text>{}</Text>
            <Text style={styles.backgroundContainerText}>All Tasks</Text>
            {/* <Text style={styles.backgroundContainerSubText}>
              {completedCount}completed
            </Text>
            <Text style={styles.backgroundContainerSubText}>
              {remainCount}remaining
            </Text> */}
            {/* <Button title={stored + 'stored'} onPress={() => {}} /> */}
          </View>
          {/* <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.linearGradient}></LinearGradient> */}
        </View>
        <View style={styles.todoCardList}>
          {todos &&
            todos.map((elem: any) => {
              // const formattedDate = formatDateToDayMonth(elem.date);
              return (
                <View style={styles.todoCard} key={elem.date + 1}>
                  <View>
                    <Text
                      style={
                        elem.completed
                          ? [styles.todoCardTitle, styles.completedTodo]
                          : [styles.todoCardTitle]
                      }>
                      {elem.title}
                    </Text>
                    <Text>from {formatDateToDayMonth(elem.date)}</Text>
                  </View>
                  <View style={styles.todoCardControls}>
                    <Text
                      style={styles.todoDoneBtn}
                      onPress={
                        elem.completed
                          ? () => {
                              const updatedTodos = todos.map(
                                (todo: {title: any}) => {
                                  if (todo.title === elem.title) {
                                    return {...todo, completed: false};
                                  }
                                  return todo;
                                },
                              );

                              settodos(updatedTodos);
                            }
                          : () => {
                              const updatedTodos = todos.map(
                                (todo: {title: any}) => {
                                  if (todo.title === elem.title) {
                                    return {...todo, completed: true};
                                  }
                                  return todo;
                                },
                              );

                              settodos(updatedTodos);
                            }
                      }>
                      {elem.completed ? 'Revert' : 'Done'}
                    </Text>

                    <Text
                      style={styles.todoDeleteBtn}
                      onPress={() => {
                        const filteredTodos = todos.filter(
                          (element: any) => element.date != elem.date,
                        );
                        settodos(filteredTodos);
                      }}>
                      Delete
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
      <View style={styles.inputBar}>
        <TextInput
          style={styles.inputField}
          placeholder="Add a task"
          onChangeText={e => setinput(e)}
          defaultValue={input}
          placeholderTextColor="white"
          onSubmitEditing={() => {
            const todo = {
              title: input,
              date: Date.now(),
              completed: false,
            };
            input && settodos([...todos, todo]);
            input && setinput('');
            saveData([...todos, todo]);
          }}
        />
        <Text
          style={styles.inputAdd}
          onPress={() => {
            const todo = {
              title: input,
              date: Date.now(),
              completed: false,
            };
            // saveData([...todos, todo]);
            input && settodos([...todos, todo]);
            input && setinput('');
            saveData([...todos, todo]);
          }}>
          add
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default App;
