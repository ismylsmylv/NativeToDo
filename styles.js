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
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#4260f5',
    },
    backgroundContainerText: {
        marginLeft: 20,
        fontSize: 30,
        fontWeight: '500',
        color: 'white',
    },
    backgroundContainerCountText: {
        color: 'white',
        marginHorizontal: 20,
    },
    backgroundContainerSubText: {
        marginLeft: 20,
        fontSize: 16,
        color: 'white',
    },
    todoCard: {
        borderWidth: 2,
        margin: 10,
        padding: 10,
        borderRadius: 5,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        overflowY: 'scroll',
        height: 'auto',
    },
    todoContent: {
        flex: 1,
        marginRight: 15
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
        backgroundColor: 'white',
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
        overflowY: 'scroll',

    },
    todoDoneBtn: {
        color: 'green',
        marginRight: 20,
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
        flex: 1,
        // opacity: 0.8
    },
    inputAdd: {
        // textTransform: 'uppercase',
        // fontWeight: '700',
        // paddingHorizontal: 10,
        // paddingVertical: 5,
        // color: 'black',
        // backgroundColor: 'white',
        // borderRadius: 5,
        // height: 30, width: 40
    },
    back: {
        backgroundColor: 'white',
    },
    placeholder: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        color: 'gray'
    },
    placeholderImg: {
        height: 100,
        width: 100,
        objectFit: 'cover',
        marginVertical: 20,
        marginTop: 80,
    },
    placeholderTexts: {
        color: 'gray'
    }
});

export default styles;
