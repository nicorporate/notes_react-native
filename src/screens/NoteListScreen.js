import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddNoteScreen from "./AddNoteScreen";
import { FlatList } from "react-native";

import { useState, useEffect } from "react";
import realm from "../../store/realm";

const dateFormat = (date) => {
    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    const noteDate = new Date(date);
    const dateOnly = noteDate.getDate();
    const monthOnly = noteDate.getMonth();
    const yearOnly = noteDate.getFullYear();

    return months[monthOnly] + ' ' + dateOnly + ', ' + yearOnly;
};


const NoteListScreen = (props) => {
    const {navigation} = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        const noteListPage = navigation.addListener( 'focus', () => {
            const notes = realm.objects('Note');
            const notesByDate = notes.sorted('id', true);
            setData(notesByDate);
        });
        return noteListPage;
    }, []);
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>
                    Notes
                </Text>
            </View>
            <FlatList 
                contentContainerStyle={styles.flatListContainer}
                data={data}
                keyExtractor={ (item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    return (
                        <View style={styles.mainDataContainer}>
                            <TouchableOpacity
                                style={styles.noteButton}
                            >
                                <View style={styles.noteContainer}>
                                    <Text style={styles.noteText}>
                                        {item.note}
                                    </Text>
                                </View>
                                <Text style={styles.dateText}>
                                    {dateFormat(item.date)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateNote')}>
                    <Icon 
                        name="plus"
                        type="antdesign"
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default NoteListScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        padding: 8,
        backgroundColor: 'moccasin',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 20,
        padding: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16
    },
    addButton: {
        backgroundColor: 'pink',
        padding: 16,
        borderRadius: 100
    },
    flatListContainer: {
        padding: 8,
    },
    mainDataContainer: {
        margin: 8,
        backgroundColor: 'whitesmoke',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    noteButton: {
        flex: 1,
        padding: 8,
        margin: 8
    },
    noteContainer: {
        maxHeight: 40,
        paddingBottom: 10
    },
    noteText: {
        textAlign: 'justify',
        color: 'black'
    },
    dateText: {
        fontSize: 12,
        color: 'black'
    }


})
