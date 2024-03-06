import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
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
  const [input, setinput] = useState('');
  const [todos, settodos] = useState([] as object | string | any);
  const [completedCount, setcompletedCount] = useState(0);
  const [remainCount, setremainCount] = useState(0);
  useEffect(() => {
    todos.map((elem: {completed: boolean}) => {
      elem.completed
        ? setcompletedCount(completedCount + 1)
        : setremainCount(remainCount + 1);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

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
        <View style={styles.backgroundContainer}>
          <View
            style={styles.imageHero}
            // source={require('./img/background4.png')}
          >
            <Text style={styles.backgroundContainerText}>All Tasks</Text>
            {/* <Text style={styles.backgroundContainerSubText}>
              {completedCount}completed
            </Text>
            <Text style={styles.backgroundContainerSubText}>
              {remainCount}remaining
            </Text> */}
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
                <View style={styles.todoCard} key={elem.date}>
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
            input && settodos([...todos, todo]);
            input && setinput('');
          }}>
          add
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    // borderColor: '#4260f5',
    // borderWidth: 4,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  imageHero: {
    zIndex: 30,
    height: 100,
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#4260f5',
  },
  backgroundContainerText: {
    marginLeft: 20,
    fontSize: 30,
    fontWeight: '500',
    color: 'white',
  },
  backgroundContainerSubText: {
    marginLeft: 20,
    fontSize: 16,
    color: 'white',
  },
  todoCard: {
    borderColor: '#4260f5',
    borderWidth: 2,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    overflow: 'scroll',
  },
  todoCardTitle: {
    alignSelf: 'flex-start',
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  todoCardList: {
    marginBottom: 60,
    backgroundColor: 'white',
  },
  todoCardCompleteBtn: {
    alignSelf: 'flex-end',
  },
  main: {
    position: 'relative',
    flex: 1,
    height: 'auto',
    justifyContent: 'space-between',
  },
  inputBar: {
    flex: 1,
    // height: 100,
    // width: 300,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'stretch',
    width: '100%',
    height: 50,
    backgroundColor: '#4260f5',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
    zIndex: 100,
  },
  todoCardControls: {
    display: 'flex',
    flexDirection: 'row',
  },
  todoDoneBtn: {
    color: 'green',
    marginRight: 10,
  },
  todoDeleteBtn: {
    color: 'red',
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  inputField: {
    color: 'white',
    fontSize: 17,
  },
  inputAdd: {
    textTransform: 'uppercase',
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  back: {
    backgroundColor: 'white',
  },
});

export default App;
