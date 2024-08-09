import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useState } from 'react';
import realm from '../../store/realm';


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
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Create</Text>
                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => saveNote(tempNote)}
                    >
                        <Icon
                        name="check"
                        type="font-awesome-5"
                        size={18}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.date}>{ getCurrentDate() }</Text>
                <TextInput
                    multiline
                    placeholder="Write here"
                    placeholderTextColor="gray"
                    style={styles.input}
                    onChangeText={(text) => setTempNote(text)}
                />
            </View>
        )
};
export default AddNoteScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    headerContainer: {
        padding: 8,
        backgroundColor: 'moccasin',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
        padding: 8,
        fontWeight: 'bold',
        color: 'black'
    },
    button: {
        padding: 8
    },
    date: {
        top: 16,
        left: 16,
        color: 'black',
        paddingBottom: 16
    },
    input: {
        fontSize: 16,
        // flex: 1,
        // right: 8,
        // left: 16,
        // textAlignVertical: 'bottom'
        textAlignVertical: 'top',
        color: 'black',
        borderWidth: 2,
        padding: 8,
        margin: 16
    }
})