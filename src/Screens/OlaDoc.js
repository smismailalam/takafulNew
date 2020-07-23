import React, {Component} from 'react';
import {View, BackHandler} from 'react-native';
import {WebView} from 'react-native-webview';
export default class OlaDoc extends React.PureComponent {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('User');
      return true;
    });
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }

  injectedToHtml() {
    let injectedData = `document.getElementsByName('verified_mobile_number')[0].value = '03423156234';
    document.getElementsByName('city')[0].value = 'karachi'; 
    document.getElementsByName('name')[0].value = 'Ismail';
    document.getElementsByName("widget")[0].setAttribute("style", "opacity: 0;");
    document.getElementsByName("submit")[0].click();
    var el = document.getElementsByTagName('body')[0];
    el.innerHTML = "<img style='width: 1000px;display: block; margin: auto;' src='https://cdn.lowgif.com/full/ee5eaba393614b5e-pehliseedhi-suitable-candidate-suitable-job.gif' />";`;
    return injectedData;
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        {/* <WebView source={{html:global.html}} style={{width:'100%',height:200,marginTop:20}} /> */}
        {/* <WebView source={{ uri: 'https://staging.oladoc.com/' }} style={{width:'100%',height:200,marginTop:20}} /> */}
        <WebView
          injectedJavaScript={this.injectedToHtml()}
          javaScriptEnabled={true}
          source={{uri: 'https://staging.oladoc.com/widget'}}
          style={{width: '100%', height: 200, marginTop: 20}}
        />
      </View>
    );
  }
}
