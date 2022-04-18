import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../config';


const Fetch = () => {
    const [todos, setTodos] = useState([]); // todos
    const todoRef = firebase.firestore().collection('todos'); // todos collection reference

    //fetch the data from firestore database
    useEffect(() => {
        todoRef
        .orderBy('createdAt', 'desc')   // order by time of creating
        .onSnapshot(
            querySnapshot => {
                const newTodos = []
                querySnapshot.forEach(doc => {
                    const todo = doc.data()
                    todo.id = doc.id
                    newTodos.push(todo)
                });
                // set the todos to the state
                setTodos(newTodos)
            },
            error => {
                console.error(error)
            }
        )
    })
    return (
        <View>
            <FlatList
                style={{height:'100%'}}
                data={newTodos}
                numColumns={1}
                renderItem={({item}) => (
                    <Pressable
                    style={styles.innerContainer}
                    >
                    <View>
                    <Text style={styles.itemHeading}>{item.heading}</Text>
                    <Text style={styles.itemText}>{item.text}</Text>
                    </View> 
                        
                    </Pressable>

                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    },

    itemHeading: {
        fontWeight: 'bold'
    },
    itemText: {
        fontWeight: '300'
    }
});

export default Fetch