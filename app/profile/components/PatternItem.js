import React, {Component} from 'react';
import {StyleSheet, TouchableHighlight, Text, View, Alert} from 'react-native';

export default class PatternItem extends Component {

    onPress = () => {
        const {navigate} = this.props.navigation;
        navigate("PatternEditor");
    }

    render() {
        return (
            <TouchableHighlight onPress={this.onPress} style={styles.item}>
                <View style={styles.header}>
                    <Text style={styles.title}>Pattern</Text>
                </View>
            </TouchableHighlight>
        );
    }

}

const styles = StyleSheet.create({
    item: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid',
        borderColor: '#000'
    },
    header: {
        height: 100,
        backgroundColor: "#6d6d6d"
    },
    title: {
        color: "#fff",
        fontSize: 40,
        fontFamily: "Arial",
        marginLeft: 20,
        marginTop: 20,
        fontWeight: 'bold',
    }
});