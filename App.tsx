/* eslint-disable react-hooks/exhaustive-deps */
// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './styles';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faCirclePlus,
  faRotateLeft,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {SwipeListView} from 'react-native-swipe-list-view';
// import {faCheck} from '@fortawesome/free-solid-svg-icons';
function formatDateToDayMonth(timestamp: string | number | Date) {
  const date = new Date(timestamp);
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
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const formattedDate = `${day} ${monthNames[monthIndex]}`;

  return formattedDate;
}

function App(): React.JSX.Element {
  let STORAGE_KEY = '@user_input';
  const saveData = async (todoInput: any[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todoInput));
      // alert('Data successfully saved');
    } catch (e) {
      // alert('Failed to save the data to the storage');
    }
  };

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);

      if (value !== null) {
        const parsedValue = JSON.parse(value);
        setstored(JSON.stringify(parsedValue));
        settodos(parsedValue);
        // alert('Data successfully fetched');
        let counter = 0;
        parsedValue.map((elem: {completed: boolean}) => {
          console.log(elem);
          if (!elem.completed) {
            counter++;
          }
          // !elem.completed &&
        });
        console.log(counter, 'remain');
        setremainCount(counter);
      }
    } catch (e) {
      // alert('Failed to fetch the input from storage');
    }
  };

  const [input, setinput] = useState('');
  const [todos, settodos] = useState([] as object | string | any);
  const [refreshing, setRefreshing] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stored, setstored] = useState('');
  const [remainCount, setremainCount] = useState(0);
  useEffect(() => {
    readData();
    // setremainCount(stored);
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    readData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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
      {/* heading */}
      <View style={styles.backgroundContainer}>
        <View style={styles.imageHero}>
          <Text style={styles.backgroundContainerText}>Tasks</Text>
          {
            <Text style={styles.backgroundContainerCountText}>
              {remainCount !== 0
                ? `${remainCount} remaining`
                : todos && todos.length > 0 && <Text>All tasks completed</Text>}
            </Text>
          }
        </View>
      </View>
      {/* list todos */}
      {todos && todos.length == 0 ? (
        <View style={styles.placeholder}>
          <Image
            source={require('./img/main.png')}
            style={styles.placeholderImg}
          />
          <Text style={styles.placeholderTexts}>Nothing to do</Text>
          <Text style={styles.placeholderTexts}>Enjoy your day!</Text>
        </View>
      ) : (
        <SwipeListView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              style={[styles.refresh, styles.swipeList]}
            />
          }
          data={todos}
          style={styles.todoScroll}
          renderItem={(data: any) => (
            <TouchableWithoutFeedback
              onPress={
                data.item.completed
                  ? () => {
                      const updatedTodos = todos.map((todo: {title: any}) => {
                        if (todo.title === data.item.title) {
                          return {...todo, completed: false};
                        }
                        return todo;
                      });

                      settodos(updatedTodos);
                      saveData(updatedTodos);
                      setremainCount(remainCount + 1);
                    }
                  : () => {
                      const updatedTodos = todos.map((todo: {title: any}) => {
                        if (todo.title === data.item.title) {
                          return {...todo, completed: true};
                        }
                        return todo;
                      });

                      settodos(updatedTodos);
                      saveData(updatedTodos);
                      setremainCount(remainCount - 1);
                    }
              }>
              <View
                style={
                  data.item.completed
                    ? [styles.todoCard, {borderColor: '#ababab'}]
                    : [styles.todoCard, {borderColor: '#4260f5'}]
                }>
                <View style={styles.todoContent}>
                  <Text
                    style={
                      data.item.completed
                        ? [styles.todoCardTitle, styles.completedTodo]
                        : [styles.todoCardTitle]
                    }>
                    {data.item.title}
                  </Text>
                  <Text
                    style={
                      data.item.completed
                        ? {color: '#ababab'}
                        : {color: '#2596be'}
                    }>
                    from {formatDateToDayMonth(data.item.date)}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
          renderHiddenItem={(data: any) => (
            <View style={[styles.todoCardControls, styles.rightControl]}>
              <TouchableOpacity
                onPress={
                  data.item.completed
                    ? () => {
                        const updatedTodos = todos.map((todo: {title: any}) => {
                          if (todo.title === data.item.title) {
                            return {...todo, completed: false};
                          }
                          return todo;
                        });

                        settodos(updatedTodos);
                        saveData(updatedTodos);
                        setremainCount(remainCount + 1);
                      }
                    : () => {
                        const updatedTodos = todos.map((todo: {title: any}) => {
                          if (todo.title === data.item.title) {
                            return {...todo, completed: true};
                          }
                          return todo;
                        });

                        settodos(updatedTodos);
                        saveData(updatedTodos);
                        setremainCount(remainCount - 1);
                      }
                }>
                {data.item.completed ? (
                  <FontAwesomeIcon
                    icon={faRotateLeft}
                    style={{color: '#2596be', marginRight: 15}}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{color: '#2596be', marginRight: 15}}
                  />
                )}
              </TouchableOpacity>
              <Text
                style={styles.todoDeleteBtn}
                onPress={() => {
                  const filteredTodos = todos.filter(
                    (element: any) => element.date != data.item.date,
                  );
                  settodos(filteredTodos);
                  saveData(filteredTodos);
                  !data.item.completed && setremainCount(remainCount - 1);
                }}>
                <FontAwesomeIcon icon={faTrash} style={{color: '#2596be'}} />
              </Text>
            </View>
          )}
          leftOpenValue={85}
          rightOpenValue={-85}
          disableRightSwipe={true}
        />
      )}

      {/* input */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.inputField}
          placeholder="Add a task"
          onChangeText={e => setinput(e)}
          defaultValue={input}
          placeholderTextColor="#dedede"
          onSubmitEditing={() => {
            const todo = {
              title: input,
              date: Date.now(),
              completed: false,
            };
            input && settodos([...todos, todo]);
            input && setinput('');
            const updatedTodosArr = [...todos, todo];
            saveData(updatedTodosArr);
          }}
        />
        <TouchableOpacity
          style={styles.inputAdd}
          onPress={() => {
            const todo = {
              title: input.trim(),
              date: Date.now(),
              completed: false,
            };
            if (input.trim()) {
              const updatedTodosArr = [...todos, todo];
              settodos(updatedTodosArr);
              setinput('');
              saveData(updatedTodosArr);
              setremainCount(remainCount + 1);
            }
          }}>
          {/* add */}
          <FontAwesomeIcon
            icon={faCirclePlus}
            style={{color: '#ffffff'}}
            size={30}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default App;
