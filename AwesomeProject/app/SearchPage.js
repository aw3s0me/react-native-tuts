import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableHighlight
} from 'react-native';

export default class SearchPage extends Component {
    render() {
        const styles = StyleSheet.create({
            description: {
                marginBottom: 20,
                fontSize: 18,
                textAlign: 'center',
                color: '#656565'
            },
            container: {
                padding: 30,
                marginTop: 65,
                alignItems: 'center'
            }
        });

        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    Search for houses to buy!
                </Text>
                <Text style={styles.description}>
                    Search by place-name, postcode or search near your location
                </Text>
            </View>
        )
    }
}