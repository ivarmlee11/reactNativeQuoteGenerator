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
  Button,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

// quotes

import quotes from './app/quotes.js';

export default class intro_react_native_app extends Component {


  constructor(props) {
    super(props);

    this.state = {
      imageUrl: 'http://placehold.it/350x150/000000/000000',
      quote: '',
      quotee: ''
    };
  
    const getQuote = () => {
      let quoteArray = [];
      quotes.forEach((val) => {
        quoteArray.push(val);
      });
      let rand = quoteArray[Math.floor(Math.random() * quoteArray.length)];
      this.setState({
        quote: rand[0],
        quotee: rand[1]
      })
      console.log(this.state);
    };
  
    this.getImage = () => {
      fetch('https://api.unsplash.com/photos/random/?client_id=047d5b160dbc377140d18b48b2db9391fcab8800a649bd639f92d4332560ad6f')
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({imageUrl: resJson.urls.regular});
        getQuote()
      })
      .catch((err) => {
        console.log(err);
      });
    };

  };

  render() {

    return (
        <View style={styles.container}>

          <Button
            onPress={this.getImage}
            title="Wisdom Button"
            color="#841584"
            accessibilityLabel="This button generates an image with a quote overlayed on it."
          />

          <Image
            source={{uri: this.state.imageUrl}}
            style={styles.backdrop}
          >

            <View style={styles.backdropView}>

              <Text style={styles.quote}>
                {this.state.quote}
              </Text>
              <Text style={styles.quote}>
                {this.state.quotee}
              </Text>

            </View>

          </Image>

      </View>

    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#000000',
    alignSelf: 'stretch'
  },
  backdrop: {
    paddingTop: 60,
    alignSelf: 'stretch'
  },
  backdropView: {
    height: 120,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  quote: {
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  }

})

AppRegistry.registerComponent('intro_react_native_app', () => intro_react_native_app);
