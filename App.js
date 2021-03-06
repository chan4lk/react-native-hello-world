import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import { MSAdalLogin, MSAdalLogout } from 'react-native-ms-adal';
import CookieManager from 'react-native-cookies';

const authority = "https://login.windows.net/common";
const resourceUri = "https://graph.windows.net";
//const clientId = 'a96ed26d-1bfc-48e2-bedc-b167ce779428';
const clientId = '3767e5e7-0d71-46d5-94f5-3d722833979c';
const redirectUri = 'http://localhost';
const secret = 'V2PRU03oiq3z68yrBI0vrWAQBgdSWf27v6zOWPQGq/U='
export default class adalExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedin: false,
      givenName: '',
    }
  }

  renderLogin() {
    return (
      <Button title="login" onPress={() => {
        
          MSAdalLogin(authority, clientId, redirectUri, resourceUri)
          .then((authDetails) => {
            this.setState({
              isLoggedin: true,
              givenName: authDetails.userInfo.givenName
            })
          }).catch((err) => {
            console.error(err)
          })
        
      }} />
    );
  }

  renderLogout() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Hi {this.state.givenName}!</Text>
        <Button title="logout" onPress={() => {
          MSAdalLogout(authority, redirectUri)
          .then(() => {
            CookieManager.clearAll().then((res) => {
              this.setState({
                isLoggedin: false,
                givenName: '',
              })
          })
          })
        }} />

      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.isLoggedin
            ? this.renderLogout()
            : this.renderLogin()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
