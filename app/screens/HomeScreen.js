import {Font} from 'expo';
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

    state = {
        fontLoaded: false
    }

    static navigationOptions = getNavOptions('Home');

    render() {
        if (!this.state.fontLoaded) return null;
        return (
            <ScrollView>
                {this.printProfiles(10)}
            </ScrollView>
        );
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Arial': require('../fonts/Arial.ttf')
        });
        this.setState({ fontLoaded: true });
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