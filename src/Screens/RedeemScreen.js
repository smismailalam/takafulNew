import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, PixelRatio, StatusBar, BackHandler, TouchableOpacity } from 'react-native'

// import { Divider } from 'react-native-paper'
import { BarChart, Grid } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop } from "react-native-svg";
import Video from 'react-native-video'
import Identity from '../Components/cards/Identity'
import NearByCards from '../Components/cards/NearByCards'
import ConsultADoc from '../Components/cards/ConsultADoc'
// import BarChartView from '../Components/BarChartView'
import WalkingRecord from '../Components/cards/WalkingRecord'
import AvailDiscounts from '../Components/cards/AvailDiscounts'
import Navigation from '../Components/Navigation'
import Policy from '../Components/Policy'
import { TouchableRipple, Modal, Portal, Provider } from 'react-native-paper';
import OTPInputView from '@twotalltotems/react-native-otp-input'

export default class RedeemScreen extends Component {
    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
        this.state = {
            onBack: true
        }
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        BackHandler.exitApp();
    }

    locationModal() {
        return (
            <Portal>
                <Modal
                    contentContainerStyle={{ backgroundColor: '#ffffff', flex: 0.5, width: '80%', marginHorizontal: '10%' }}
                    onDismiss={() => this.setState({ locationModal: false })}
                    visible={this.state.locationModal}
                >
                    <View
                        style={{ display: 'flex', flex: 0.3, flexDirection: 'row', backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e0e0e0', justifyContent: 'center' }}
                    >

                        <View style={{ flex: 0.9, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 15,
                                color: '#3a3a3a',
                                fontWeight: '700'
                            }}>{this.state.selectedOutlet}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'column',
                            flex: 0.1,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            // marginRight: 5,
                        }}>
                            <TouchableOpacity onPress={() => { this.setState({ locationModal: false }) }}>
                                <Image style={{ width: 20, height: 20, }} source={require('../../assets/icons/android/drawable-xxxhdpi/cross.png')} />
                            </TouchableOpacity>
                        </View>

                    </View>


                    <ScrollView contentContainerStyle={{ flex: 0.7, padding: 0 }}>
                        {this.state.outletList.map(item =>
                            this.renderOutletList(item)
                        )}
                    </ScrollView>
                </Modal>
            </Portal>
        )
    }

    render() {
        return (
            <Provider style={styles.screen}>

                <View style={{
                    flex: 0.35,
                    flexDirection: 'column',
                    elevation: 3,
                    paddingTop: StatusBar.currentHeight,
                    borderColor: 1
                }}>

                    <Video
                        source={require('../../assets/video/logo.mp4')}
                        style={styles.backgroundVideo}
                        muted={true}
                        repeat={true}
                        resizeMode={"cover"}
                        rate={1.0}
                        useTextureView={true}
                        ignoreSilentSwitch={"obey"}

                    />

                    {/* {this.locationModal()} */}
                </View>

                <View style={{flex: 0.65}}>
                    <OTPInputView
                        style={{ width: '70%', height: 200, justifyContent: 'center' }}
                        pinCount={4}
                        autoFocusOnLoad={false}
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={(code => {
                            console.log(`Code is ${code}, you are good to go!`)
                        })}
                    />
                </View>

                <StatusBar translucent backgroundColor="#424242" />

            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    backgroundVideo: {
        height: '100%',
        width: '100%',
    },
    screen: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#E5E5E5'
        // paddingVertical: 20,
        // justifyContent: 'center'
        // padding: 70,
        // justifyContent: 'center'
    },
    cards: {
        justifyContent: 'space-around',
        marginVertical: 20,
        width: '100%',
        paddingHorizontal: 20,

        flex: 0.65,

        // marginHorizontal: 20
    },
    identity: {
        flex: 0.35,
        // paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: { flex: 1, justifyContent: "center", alignItems: 'center' },
    grayView: {
        zIndex: 0,
        flex: 1,
        backgroundColor: 'transparent',
        opacity: 0.2,
    },
    logoView: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
