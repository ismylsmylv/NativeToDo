/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
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

export default styles;