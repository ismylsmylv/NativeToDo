/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

function CompletedButton() {
  return (
    <TouchableOpacity style={styles.todoCardCompleteBtn}>
      <Text style={styles.todoCardCompleteBtn}>Done</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  todoCardCompleteBtn: {
    alignSelf: 'flex-end',
  },
});
export default CompletedButton;
