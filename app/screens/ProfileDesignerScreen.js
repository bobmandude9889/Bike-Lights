import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import PatternItem from '../profile/components/PatternItem';
require('./HomeScreen');

export default class ProfileDesignerScreen extends React.Component {
    static navigationOptions = getNavOptions('Profile Designer');

    render() {
        return (
            <ScrollView>
                {this.printPatterns(10)}
            </ScrollView>
        );
    }

    printPatterns = (n) => {
        var profiles = new Array();
        for (var i = 0; i < n; i++) {
            var profile = <PatternItem navigation={this.props.navigation} key={i}/>
            profiles.push(profile);
        }
        return profiles;
    }

}

const styles = StyleSheet.create({
});