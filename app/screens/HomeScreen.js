import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import ProfileItem from '../profile/components/ProfileItem';

getNavOptions = title => {
    return {
        title: title,
        headerStyle: {
            backgroundColor: '#1b1b1b'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    }
}

export default class HomeScreen extends Component {

    static navigationOptions = getNavOptions('Home');

    render() {
        return (
            <ScrollView>
                {this.printProfiles(10)}
            </ScrollView>
        );
    }

    printProfiles = (n) => {
        var profiles = new Array();
        for (var i = 0; i < n; i++) {
            var profile = <ProfileItem navigation={this.props.navigation} key={i}/>
            profiles.push(profile);
        }
        return profiles;
    }
}