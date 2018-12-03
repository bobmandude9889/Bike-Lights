import React from 'react';
import {StyleSheet, Picker, View, TextInput, Slider, Switch, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
require('./HomeScreen');

const patternTypes = ['Rainbow', 'Solid', 'Fade'];
const patternMenus = {
    Rainbow: {
        hueOffset: {
            title: 'Hue Offset',
            type: 'slider',
            min: 1,
            max: 100,
            step: 1,
            default: 7
        },
        direction: {
            title: 'Reverse Direction',
            type: 'switch',
            default: false
        },
        speed: {
            title: 'Speed',
            type: 'slider',
            min: 1,
            max: 30,
            step: 0.1,
            default: 5
        }
    },
    Solid: {},
    Fade: {}
}

export default class PatternEditorScreen extends React.Component {
    static navigationOptions = getNavOptions('Pattern Editor');

    constructor(props) {
        super(props);
        this.state = {
            pattern: patternTypes[0],
            name: 'Pattern'
        };
        
        var menu = patternMenus[this.state.pattern];
        var keys = Object.keys(menu);
        
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            this.state[key] = menu[key].default;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TextInput
                        style={styles.patternName}
                        onChangeText={text => this.setState({name: text})}
                        value={this.state.name}
                    />
                    <Picker
                        style={styles.patternType}
                        selectedValue={this.state.pattern}
                        onValueChange={(value, key) => {this.setState({pattern: value});}}
                    >
                        {this.getPickerItems()}
                    </Picker>
                </View>
                <ScrollView style={styles.settingsContainer}>{this.getSettings()}</ScrollView>
            </View>
        );
    }

    getPickerItems = () => {
        var items = new Array();
        for (var i = 0; i < patternTypes.length; i++) {
            patternType = patternTypes[i];
            items.push(<Picker.Item label={patternType} value={patternType} key={i}/>);
        }
        return items;
    }

    getSettings = () => {
        var settings = new Array();
        var menu = patternMenus[this.state.pattern];
        var keys = Object.keys(menu);
        for (var i = 0; i < keys.length; i++) {
            const key = keys[i];
            var setting = menu[key];
            var updateValue = value => {
                var state = new Object();
                state[key] = value;
                this.setState(state);
            };
            switch (setting.type) {
            case 'switch':
                settings.push(<Switch
                    value={this.state[key]}
                    onValueChange={updateValue}
                    key={i}
                    />);
                break;
            case 'slider':
                settings.push(<Slider 
                    minimumValue={setting.min} 
                    maximumValue={setting.max} 
                    value={this.state[key]}
                    step={setting.step}
                    onValueChange={updateValue}
                    key={i}
                    />);
                break;
            }
        }
        return settings;
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#555',
        color: '#fff',
        flex: 1
    },
    header: {
        backgroundColor: '#424242',
        padding: 5,
        borderBottomWidth: StyleSheet.hairlineWidth * 1,
        borderStyle: 'solid',
        borderColor: '#252525',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13
    },
    patternType: {
        color: '#fff',
        borderBottomWidth: 3,
        borderStyle: 'solid',
        borderColor: '#000'
    },
    patternName: {
        color: '#fff',
        borderBottomColor: '#a4a4a4',
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
        borderStyle: 'solid'
    },
    settingsContainer: {
        paddingTop: 30
    }
});