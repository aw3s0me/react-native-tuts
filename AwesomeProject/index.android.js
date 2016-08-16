/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight
} from 'react-native';
import SearchPage from './app/SearchPage';

export default class PropertyFinderApp extends Component {
    render() {
        const styles = StyleSheet.create({
            text: {
                color: 'black',
                backgroundColor: 'white',
                fontSize: 30,
                margin: 80
            },
            container: {
                flex: 1
            }
        });
        const routes = [
            {title: 'First Scene', index: 0},
            {title: 'Second Scene', index: 1},
        ];
        console.log(SearchPage)
        return (
            <Navigator
                initialRoute={routes[0]}
                initialRouteStack={routes}
                renderScene={(route, navigator) => {
                    if (route.index === 0) {
                        return <SearchPage />
                    }
                    else {
                        return <Text>Hello {route.title}!</Text>
                    }
                }}
                style={styles.container}
            />
        );
    }
}

// Defines entry point to application and provides root component
AppRegistry.registerComponent('AwesomeProject', () => PropertyFinderApp);
