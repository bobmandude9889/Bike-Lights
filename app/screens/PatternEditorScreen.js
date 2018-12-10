import React from 'react';
import {StyleSheet, Picker, View, TextInput, Slider, Switch, Text, ImageBackground, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {HueSlider, SaturationSlider, LightnessSlider} from 'react-native-color';
import AlphaSlider from '../profile/components/AlphaSlider';
import tinycolor from 'tinycolor2';
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
    Solid: {
        color: {
            title: 'Color',
            type: 'color',
            default: tinycolor('#fa8d35').toHsl()
        }
    },
    Fade: {
        color1: {
            title: 'Color 1',
            type: 'color',
            default: tinycolor('#000').toHsl()
        },
        color2: {
            title: 'Color 2',
            type: 'color',
            default: tinycolor('#fff').toHsl()
        },
        interval: {
            title: 'Interval (Seconds)',
            type: 'slider',
            min: 0.1,
            max: 10,
            step: 0.1,
            default: 3
        }
    }
}

export default class PatternEditorScreen extends React.Component {
    static navigationOptions = getNavOptions('Pattern Editor');

    constructor(props) {
        super(props);
        this.state = {
            pattern: patternTypes[0],
            name: 'Pattern'
        };
        
        for (var i = 0; i < patternTypes.length; i++) {
            var menu = patternMenus[patternTypes[i]];
            var keys = Object.keys(menu);
            for (var j = 0; j < keys.length; j++) {
                var key = keys[j];
                this.state[key] = menu[key].default;
            }
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
            
            const updateHue = h =>  {
                var state = new Object();
                state[key] = {...this.state[key], h}
                this.setState(state);
            };
            const updateSaturation = s =>  {
                var state = new Object();
                state[key] = {...this.state[key], s}
                this.setState(state);
            };
            const updateLightness = l =>  {
                var state = new Object();
                state[key] = {...this.state[key], l}
                this.setState(state);
            };
            const updateAlpha = a =>  {
                var state = new Object();
                state[key] = {...this.state[key], a}
                this.setState(state);
            };

            var containerTypeStyle = styles[setting.type + "Container"];
            const containerStyle = (i == keys.length - 1 ? [containerTypeStyle, styles.settingContainer] : [containerTypeStyle, styles.settingContainer, styles.border]);
            switch (setting.type) {
            case 'switch':
                settings.push(
                <View style={containerStyle} key={i}>
                    <Text style={styles.switchTitle}>
                        {setting.title}
                    </Text>
                    <Switch
                        style={styles.switch}
                        value={this.state[key]}
                        onValueChange={updateValue}
                        thumbColor={this.state[key] ? '#fff' : '#aaa'}
                        trackColor={{true: '#aaa', false: '#222'}}
                        />
                </View>
                );
                break;
            case 'slider':
                settings.push(
                <View style={containerStyle} key={i}>
                    <View style={styles.sliderHeader}>
                        <Text style={styles.sliderTitle}>
                            {setting.title}
                        </Text>
                        <Text style={styles.sliderValue}>
                            {this.state[key].toFixed(1)}
                        </Text>
                    </View>
                    <Slider 
                        style={styles.slider}
                        minimumValue={setting.min} 
                        maximumValue={setting.max} 
                        value={this.state[key]}
                        step={setting.step}
                        minimumTrackTintColor={'#fff'}
                        thumbTintColor={'#fff'}
                        onValueChange={updateValue}
                        />
                </View>);
                break;
            case 'color':
                settings.push(
                <View style={containerStyle} key={i}>
                    <View style={styles.colorHeader}>
                        <Text style={styles.colorTitle}>
                            {setting.title}
                        </Text>
                        <ImageBackground source={require('../images/alpha.png')} style={styles.colorPreview} imageStyle={styles.alphaImageStyle}>
                            <View style={[styles.colorPreview, {backgroundColor: tinycolor(this.state[key]).toHslString()}]}></View>
                        </ImageBackground>
                    </View>

                    <HueSlider
                        style={styles.colorSlider}
                        gradientSteps={40}
                        value={this.state[key].h}
                        onValueChange={updateHue}
                    />
                    <SaturationSlider
                        style={styles.colorSlider}
                        gradientSteps={20}
                        value={this.state[key].s}
                        color={{...this.state[key], a: 1}}
                        onValueChange={updateSaturation}
                    />
                    <LightnessSlider
                        style={styles.colorSlider}
                        gradientSteps={20}
                        value={this.state[key].l}
                        color={{...this.state[key], a: 1}}
                        onValueChange={updateLightness}
                    />
                    <AlphaSlider
                        style={styles.colorSlider}
                        gradientSteps={20}
                        value={this.state[key].a}
                        color={{...this.state[key], a: 1}}
                        onValueChange={updateAlpha}
                    />
                </View>
                );
                break;
            }
        }
        settings.push(<View style={{height: 40}} key={settings.length}></View>);
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
        borderBottomWidth: StyleSheet.hairlineWidth,
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
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid'
    },
    settingsContainer: {
        paddingTop: 5
    },
    switchContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 15
    },
    switchTitle: {
        flex: 1,
        color: '#fff'
    },
    switch: {
        flex: 1
    },
    sliderContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 90
    },
    sliderHeader: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    sliderTitle: {
        color: '#fff',
        flex: 1
    },
    sliderValue: {
        color: '#fff',
        flex: 1,
        textAlign: 'right',
        paddingRight: 15
    },
    slider: {
        flex: 1
    },
    settingContainer: {
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 15,
        paddingBottom: 15
    },
    border: {
        borderBottomWidth: StyleSheet.hairlineWidth * 3,
        borderStyle: 'solid',
        borderColor: '#aaa'
    },
    colorSlider: {
        alignSelf: 'stretch'
    },
    colorTitle: {
        color: '#fff',
        flex: 1
    },
    colorHeader: {
        height: 50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    colorPreview: {
        height: 40,
        width: 100,
        borderRadius: 5
    },
    alphaImageStyle: {
        borderRadius: 5
    }
});