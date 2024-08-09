import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export const HeaderComponent = (props) => {
    const { } = props;
    const { title } = props;

    return (
        // <View style={styles.headerContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>{ title }</Text>
                    <TouchableOpacity
                    style={styles.button}
                    // onPress={() => saveNote(tempNote)}
                    {...props}
                    >
                        <Icon
                        name="check"
                        type="font-awesome-5"
                        size={18}
                        />
                    </TouchableOpacity>
                </View>
        // </View>
    )
};

export const MainComponent = (props) => {
    const { } = props;
    const { date } = props;
    return (
        <View style={styles.mainContainer}>
                <Text style={styles.date}>{date}</Text>
                <TextInput
                    multiline
                    placeholder="Write here"
                    placeholderTextColor="gray"
                    style={styles.input}
                    // onChangeText={(text) => setTempNote(text)}
                    {...props}
                />
        </View>
    )
};

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