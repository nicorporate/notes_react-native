import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useState, useEffect } from 'react';
import realm from '../../store/realm';
import { HeaderComponent, MainComponent } from '../components/NoteComponent';

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



const EditNoteScreen = (props) => {
    const [tempNote, setTempNote] = useState('');
    const { route, navigation } = props;
    const id = route.params.noteId;
    
    // const data = realm.objects('Note').filtered(id);
    const [dataToUpdate, setDataToUpdate] = useState([]);
    // const data = realm.objects('Note').filtered(`id = ${id}`);
    // useEffect(() => {
    //     console.log(id)
    // }, [id])

    // edit Note function
    const [newNote, setNewNote] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const editNote = (value, editStatus) => {
        setNewNote(value);
        setIsEdit(editStatus);
    }

    // save edited data to db
    // const data = realm.objects('Note')[0];
    // realm.write(() => {
    //     data.note = 'this is my note';
    //     data.date = new Date().toISOString();
    // });

    const saveNote = (value) => {
        if (value === ''){
            alert('Note cant be empty!');
        }
        else {
            const allData = realm.objects('Note');
            allData.forEach((item) => {
                if (item.id === id && item.note !== value) {
                    realm.write(() => {
                        item.note = value;
                        item.date = new Date().toISOString();
                    });
                    navigation.navigate('NoteList')
                }
                else if (item.id === id && item.note === value) {
                    alert('Nothing changed')
                }
            })
        }
    }


    useEffect(() => {
        const data = realm.objects('Note').filtered(`id = ${id}`);
        setDataToUpdate(data)
        
    }, [] )
    useEffect(() => {
        console.log('edit screen')
        console.log(dataToUpdate)
    }, [dataToUpdate])
        return (
            
            <View style={styles.mainContainer}>
                {/* <View style={styles.headerContainer}>
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
                <Text style={styles.date}>Date</Text>
                <TextInput
                    multiline
                    placeholder="Write here"
                    style={styles.input}
                    onChangeText={(text) => setTempNote(text)}
                /> */}
                <HeaderComponent 
                    title="Edit"
                    onPress={() => saveNote(
                        isEdit ? newNote : dataToUpdate[0].note
                    )}
                />
                {
                    dataToUpdate.length !== 0 ?
                        <MainComponent
                            date={dateFormat(dataToUpdate[0].date)}
                            value={isEdit === true ? newNote : dataToUpdate[0].note} 
                            onChangeText={(text) => editNote(text, true)}
                        />
                        :
                        null
                }
                {/* <MainComponent 
                    // date="Date"
                    date={dateFormat(dataToUpdate[0].date)}
                    value={dataToUpdate[0].note}
                /> */}
            </View>
        )
};
export default EditNoteScreen;

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
        color: 'black'
    },
    input: {
        fontSize: 16,
        flex: 1,
        right: 16,
        left: 16,
        // textAlignVertical: 'bottom'
        textAlignVertical: 'top',
        color: 'black'
    }
})