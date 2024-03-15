/* eslint-disable react-hooks/exhaustive-deps */
// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
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
import {faCirclePlus, faTrash} from '@fortawesome/free-solid-svg-icons';
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

      {/* <ScrollView
        style={styles.back}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={styles.refresh}
          />
        }> */}
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
            // style={
            //   data.item.completed
            //     ? [styles.todoCard, {borderColor: '#ababab'}]
            //     : [styles.todoCard, {borderColor: '#4260f5'}]
            // }
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
        leftOpenValue={75}
        rightOpenValue={-75}
        disableRightSwipe={true}
      />
      {/* {todos && todos.length > 0 ? (
          <View style={styles.todoCardList}>
            {todos &&
              todos.map((elem: any) => {
                // const formattedDate = formatDateToDayMonth(elem.date);
                return (
                  <TouchableOpacity
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
                            saveData(updatedTodos);
                            setremainCount(remainCount + 1);
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
                            saveData(updatedTodos);
                            setremainCount(remainCount - 1);
                          }
                    }
                    style={
                      elem.completed
                        ? [styles.todoCard, {borderColor: '#ababab'}]
                        : [styles.todoCard, {borderColor: '#4260f5'}]
                    }
                    key={elem.date + 1}>
                    <TouchableOpacity
                      style={
                        elem.completed
                          ? [styles.todoCheckBox, {borderColor: '#ababab'}]
                          : [styles.todoCheckBox, {borderColor: '#4260f5'}]
                      }
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
                              saveData(updatedTodos);
                              setremainCount(remainCount + 1);
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
                              saveData(updatedTodos);
                              setremainCount(remainCount - 1);
                            }
                      }>
                      <View
                        style={
                          elem.completed && [
                            styles.todoCheckBoxDot,
                            {backgroundColor: '#ababab'},
                          ]
                          // : [
                          //     styles.todoCheckBoxDot,
                          //     {backgroundColor: '#4260f5'},
                          //   ]
                        }
                      />
                    </TouchableOpacity>

                    <View style={styles.todoContent}>
                      <Text
                        style={
                          elem.completed
                            ? [styles.todoCardTitle, styles.completedTodo]
                            : [styles.todoCardTitle]
                        }>
                        {elem.title}
                      </Text>
                      <Text
                        style={
                          elem.completed
                            ? {color: '#ababab'}
                            : {color: '#2596be'}
                        }>
                        from {formatDateToDayMonth(elem.date)}
                      </Text>
                    </View>
                    <View style={styles.todoCardControls}>
                      <Text
                        style={styles.todoDeleteBtn}
                        onPress={() => {
                          const filteredTodos = todos.filter(
                            (element: any) => element.date != elem.date,
                          );
                          settodos(filteredTodos);
                          saveData(filteredTodos);
                          !elem.completed && setremainCount(remainCount - 1);
                        }}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{color: '#2596be'}}
                        />
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Image
              style={styles.placeholderImg}
              source={require('./img/main.png')}
            />
            <Text style={styles.placeholderTexts}>Nothing to see here</Text>
            <Text style={styles.placeholderTexts}>Enjoy the productivity!</Text>
          </View>
        )} */}
      {/* </ScrollView> */}
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
              title: input,
              date: Date.now(),
              completed: false,
            };
            if (input) {
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
