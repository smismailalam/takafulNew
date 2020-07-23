import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  PixelRatio,
  StatusBar,
  BackHandler,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
// import Card from '../Components/cards/Card';
import Card from '../Components/Card';
export default class OldInvoice extends Component {
  static navigationOptions = {
    headerStyle: {
      marginTop: StatusBar.currentHeight,
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      invoices: [],
      onBack: true,
    };
  }

  componentDidMount() {
    try {
      var invoiceUrl = `http://54.36.109.50:81/avoloxapi/api/Customer/GetPendingInvoiceJson?p_cnic=${
        global.cnci
      }`;
      axios
        .get(invoiceUrl)
        .then(response => {
          if (response.status === 200) {
            this.setState({
              invoices: response.data,
            });
          }
        })
        .catch(error => {});
    } catch (error) {}
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('User');
      return true;
    });
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  render() {
    return (
      <ScrollView contentContainerStyle={{padding: 7}}>
        {this.state.invoices
          ? this.state.invoices.map((marker, i) => (
              <View style={styles.card}>
                <View style={{flex: 5}}>
                  <View style={styles.inVoiceSection}>
                    <View style={{flex: 1}}>
                      <Text style={styles.inVoiceLabel}>Assorted code</Text>
                    </View>
                    <View style={{flex: 2}}>
                      <Text style={styles.inVoiceText}>
                        {marker.assorted_code}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.inVoiceSection}>
                    <View style={{flex: 1}}>
                      <Text style={styles.inVoiceLabel}>Invoice amount</Text>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                      <View style={{flex: 2}}>
                        <Text style={styles.inVoiceNumericText}>
                          {marker.invoice_amount}
                        </Text>
                      </View>
                      <View style={{flex: 6}} />
                    </View>
                  </View>

                  <View style={styles.inVoiceSection}>
                    <View style={{flex: 1}}>
                      <Text style={styles.inVoiceLabel}>Paid amount</Text>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                      <View style={{flex: 2}}>
                        <Text style={styles.inVoiceNumericText}>
                          {marker.paid_amount}
                        </Text>
                      </View>
                      <View style={{flex: 6}} />
                    </View>
                  </View>

                  <View style={styles.inVoiceSection}>
                    <View style={{flex: 1}}>
                      <Text style={styles.inVoiceLabel}>
                        Outstanding amount
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        flexDirection: 'row',
                        borderTopWidth: 1,
                        paddingTop: 5,
                      }}>
                      <View style={{flex: 2}}>
                        <Text style={styles.inVoiceNumericText}>
                          {marker.outstanding_amount}
                        </Text>
                      </View>
                      <View style={{flex: 6}} />
                    </View>
                  </View>
                </View>
                {marker.outstanding_amount > 0 ? (
                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      rippleContainerBorderRadius={10}
                      onPress={() => this.setState({payNow: true})}
                      style={{
                        borderRadius: 20,
                        // borderTopLeftRadius:20,
                        // borderBottomLeftRadius:20,
                        backgroundColor: '#0e74bc',
                        elevation: 1,
                        borderColor: '#0e74bc',
                      }}>
                      <Text
                        style={{
                          ...styles.detailsText,
                          fontSize: 12,
                          color: '#FFF',
                          padding: 10,
                          textAlign: 'center',
                        }}>
                        Pay
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            ))
          : null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    marginBottom: 15,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  inVoiceSection: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'center',
  },
  inVoiceSectionLastChild: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderBottomColor: '#898888',
  },
  inVoiceLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#898888',
    marginRight: 5,
  },
  inVoiceText: {
    fontSize: 10,
    color: '#000',
  },
  inVoiceNumericText: {
    fontSize: 10,
    color: '#000',
    textAlign: 'right',
  },
  textBold: {
    fontWeight: 'bold',
  },
  main: {
    // flexDirection: 'column',
    // width: '100%',
    flex: 5,
    // marginTop: 10,
    // marginTop: 20,
    // paddingTop: 10,
    // paddingHorizontal: 20,
    // elevation: 1,
  },
});
