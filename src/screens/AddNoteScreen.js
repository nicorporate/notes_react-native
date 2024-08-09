import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useState } from 'react';
import realm from '../../store/realm';
import { HeaderComponent, MainComponent } from '../components/NoteComponent';


const saveNote = (newNote) => {
    const allData = realm.objects('Note');
    const dataLength = allData.length;
    let lastIdFromRealm = 0;
    if (dataLength !==0){
        lastIdFromRealm = allData[dataLength - 1].id
    } 
    
    if (newNote !== ''){
        realm.write(() => {
            realm.create("Note", {
                id: dataLength === 0 ? 1 : lastIdFromRealm + 1,
                note: newNote,
                date: new Date().toISOString()
            });
        });
        alert('Successfully save your note!')
        const data = realm.objects('Note')
        console.log(data)
    } else {
        alert('Empty note!')
    }
}

const getCurrentDate = () => {
    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    const noteDate = new Date();
    const dateOnly = noteDate.getDate();
    const monthOnly = noteDate.getMonth();
    const yearOnly = noteDate.getFullYear();

    return months[monthOnly] + ' ' + dateOnly + ', ' + yearOnly;
};

const AddNoteScreen = (props) => {
    const [tempNote, setTempNote] = useState('');
    const { navigation } = props;
        return (
            <View style={styles.mainContainer}>
                <HeaderComponent 
                    title="CreateNote"
                    onPress={() => saveNote(tempNote)}
                />
                <MainComponent 
                    date={ getCurrentDate() }
                    onChangeText={(text) => setTempNote(text) }
                />

            </View>
        )
};
export default AddNoteScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    
})