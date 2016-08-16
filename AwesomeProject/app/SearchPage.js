import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import SearchResults from './SearchResults';

/**
 * Create the query string based on parameters in data
 * Then transforms data in required string format (name=value pairs &..)
 * @param key
 * @param value
 * @param pageNumber
 * @returns {string}
 */
function urlForQueryAndPage(key, value, pageNumber) {
    var data = {
        country: 'uk',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
        page: pageNumber
    };
    data[key] = value;

    var querystring = Object.keys(data)
        .map(key => key + '=' + encodeURIComponent(data[key]))
        .join('&');

    return 'http://api.nestoria.co.uk/api?' + querystring;
}

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        // keep track whether query is in progress
        this.state = {
            searchString: 'london',
            isLoading: false,
            message: ''
        };
    }

    onSearchTextChanged(event) {
        console.log('onSearchTextChanged');
        this.setState({ searchString: event.nativeEvent.text });
        console.log(this.state.searchString);
    }

    /**
     * Runs query
     * @param query
     * @private
     */
    _executeQuery(query) {
        console.log(query);
        this.setState({ isLoading: true });

        // Part of WebAPI (better than XMLHttpRequest)
        // Response returned as a promise
        fetch(query)
            .then(response => response.json())
            .then(json => this._handleResponse(json.response))
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error
                }));
    }

    /**
     * Clears isLoading and logs # or properties found
     * @param response
     * @private
     */
    _handleResponse(response) {
        this.setState({ isLoading: false , message: '' });
        if (response.application_response_code.substr(0, 1) === '1') {
            // Navigates to newly added SearchResults component
            // Passes in the listings
            this.props.navigator.push({
                title: 'Results',
                component: SearchResults,
                passProps: {listings: response.listings}
            });
        } else {
            this.setState({ message: 'Location not recognized; please try again.'});
        }
    }

    /**
     * Configures and initiates search query
     */
    onSearchPressed() {
        var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
        this._executeQuery(query);
    }

    render() {
        // to indicate whether query is in progress
        // ActivityIndicatorIOS is deprecated => use ActivityIndicator
        const spinner = this.state.isLoading ?
            ( <ActivityIndicator
                size='large'/> ) :
            ( <View/>);

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
            },
            flowRight: {
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'stretch'
            },
            buttonText: {
                fontSize: 18,
                color: 'white',
                alignSelf: 'center'
            },
            button: {
                height: 36,
                flex: 1,
                flexDirection: 'row',
                backgroundColor: '#48BBEC',
                borderColor: '#48BBEC',
                borderWidth: 1,
                borderRadius: 8,
                marginBottom: 10,
                alignSelf: 'stretch',
                justifyContent: 'center'
            },
            searchInput: {
                height: 36,
                padding: 4,
                marginRight: 5,
                flex: 4,
                fontSize: 18,
                borderWidth: 1,
                borderColor: '#48BBEC',
                borderRadius: 8,
                color: '#48BBEC'
            },
            image: {
                width: 217,
                height: 138
            }
        });

        // logging
        console.log('SearchPage.render');

        /**
         * Wrap button Go and text field using flowRight style (flexDirection: row)
         * It horizontally places items in row
         *
         * + Without explcitly say width, we set flex property
         * flex: 4 - (input), flex:1 - button => 4:1 ratio
         */

        /**
         * As for states we have onSearchTextChanged for onChange event
         */
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    Search for houses to buy!
                </Text>
                <Text style={styles.description}>
                    Search by place-name, postcode or search near your location
                </Text>
                <View style={styles.flowRight}>
                    <TextInput
                        style={styles.searchInput}
                        value={this.state.searchString}
                        onChange={this.onSearchTextChanged.bind(this)}
                        placeholder='Search via name or postcode'/>
                    <TouchableHighlight style={styles.button}
                        underlayColor='#99d9f4'
                        onPress={this.onSearchPressed.bind(this)}>
                        <Text style={styles.buttonText}>Go</Text>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight style={styles.button}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Location</Text>
                </TouchableHighlight>
                <Image source={require('../resources/house.png')} style={styles.image}/>
                {spinner}
                <Text style={styles.description}>{this.state.message}</Text>
            </View>
        )
    }
}