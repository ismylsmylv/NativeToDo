import React, {useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CompletedButton from './components/button';
function formatDateToDayMonth(timestamp) {
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
  const [todos, settodos] = useState([]);

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        <View style={styles.backgroundContainer}>
          <ImageBackground
            style={styles.imageHero}
            source={require('./img/background4.png')}>
            <Text style={styles.backgroundContainerText}>Welcome back</Text>
          </ImageBackground>
          {/* <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.linearGradient}></LinearGradient> */}
        </View>
        <View>
          {todos &&
            todos.map(elem => {
              // const formattedDate = formatDateToDayMonth(elem.date);
              return (
                <View style={styles.todoCard} key={elem.date}>
                  <View>
                    <Text style={styles.todoCardTitle}>{elem.title}</Text>
                    <Text>from {formatDateToDayMonth(elem.date)}</Text>
                  </View>
                  <Text
                    onPress={() => {
                      const filteredTodos = todos.filter(
                        element => element.date != elem.date,
                      );
                      settodos(filteredTodos);
                    }}>
                    Done
                  </Text>
                </View>
              );
            })}
        </View>

        <View style={styles.inputBar}>
          <TextInput
            placeholder="Add a task"
            onChangeText={e => setinput(e)}
            defaultValue={input}
            onSubmitEditing={e => {
              const todo = {
                title: input,
                date: Date.now(),
                comleted: false,
              };
              settodos([...todos, todo]);
              setinput('');
            }}
          />
          <Text>button will be here</Text>
        </View>
      </ScrollView>
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
  },
  backgroundContainerText: {
    marginLeft: 20,
    fontSize: 30,
    fontWeight: '500',
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
  todoCardCompleteBtn: {
    alignSelf: 'flex-end',
  },
  main: {
    position: 'relative',
    flex: 1,
    justifyContent: 'space-between',
  },
  inputBar: {
    flex: 1,
    height: 100,
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export default App;
