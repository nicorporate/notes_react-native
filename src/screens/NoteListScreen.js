import React from "react";
import { TouchableOpacity, StyleSheet, View, Text, TextInput } from "react-native";
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
    const [searchText, setSearchText] = useState('');


    const searchData = (value) => {
        const dataFromDatabase = realm.objects('Note').sorted('date', true);
        const searchedData = dataFromDatabase.filter((item) => {
            const itemData = item.note.toLowerCase();
            const valueData = value.toLowerCase();
            return itemData.indexOf(valueData) > -1;
         });
        setData(searchedData);
        setSearchText(value);
    };

    useEffect(() => {
        const noteListPage = navigation.addListener( 'focus', () => {
            const notes = realm.objects('Note');
            const notesByDate = notes.sorted('id', true);
            setData(notesByDate);
            setSearchText('');

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
                ListHeaderComponent={
                    <View style = {styles.searchBox}>
                        <Icon name="search" type="font-awesome" size={18} style={styles.searchIcon} color="grey" />
                        <TextInput placeholder="Search Here" style={styles.searchInput} onChangeText={(text) => searchData(text)} value={searchText} />
                    </View>
                }
                keyboardShouldPersistTaps={'handled'}
                renderItem={({item}) => {
                    
                    return (

                        <View style={styles.mainDataContainer}>
                            <TouchableOpacity
                                style={styles.noteButton}
                                onPress={() => navigation.navigate('EditNote', {
                                    noteId: item.id
                                })}
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
                ListEmptyComponent={
                    <View style={styles.searchEmpty}>
                        <Text style={styles.searchEmptyText}>No Items</Text>
                    </View>
                }
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
    },

    searchBox: {
        flexDirection: 'row',
        borderWidth: 1,
        margin: 8,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center'
    },
    searchIcon: {
        padding: 8,
        paddingRight: 0
    },
    searchInput: {
        height: 30,
        padding: 8,
        flex: 1,
        color: 'black'
    },
    searchEmpty: {
        alignItems: 'center',
        margin: 8,
    },
    searchEmptyText: {
        color: 'black'
    }
})
