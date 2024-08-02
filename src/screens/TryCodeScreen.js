import React from "react";
import { View, StyleSheet } from "react-native";

const TryCodeScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.secondContainer}>
                <View style={styles.blueBox} />
                <View style={styles.redBox} />
                <View style={styles.blueBox} />
                <View style={styles.blueBox} />
            </View>
        </View>
    );
};

export default TryCodeScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'skyblue'
    },
    secondContainer: {
        flex: 1,
        backgroundColor: 'mistyrose',
        padding: 16,
        margin: 16,
        flexDirection: 'row'
    },
    blueBox: {
        backgroundColor: 'blue',
        width: '25%',
        height: '25%',
        borderWidth: 1
    },
    redBox: {
        backgroundColor: 'red',
        width: '25%',
        height: '25%',
        borderWidth: 1,
        // top: 0,
        bottom: 0,
        // left: 0,
        right: 0,
        zIndex: 1,
        position: 'absolute'
    },
})