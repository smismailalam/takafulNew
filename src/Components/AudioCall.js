import React, { Component } from 'react';
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
    BackHandler
} from 'react-native'

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
import * as Animatable from 'react-native-animatable';
import Ripple from 'react-native-material-ripple';
// import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
} from 'react-native-webrtc';


import InCallManager from 'react-native-incall-manager';
import FilePickerManager from "react-native-file-picker";
import axios from "axios";

export default class AudioCall extends Component {

    constructor(props) {
        super(props)
        this.state = {
            onBack: true,
            audioCallStatus: 'Connecting To a Doctor...',
            timer: null,
            counter: '00',
            miliseconds: '00',
            startDisabled: true,
            stopDisabled: false,
            audioIconAnimation: 'pulse',
            audioIconIteration: 'infinite',
        }
    }

    getStream() {

        InCallManager.setSpeakerphoneOn(true);

        mediaDevices.enumerateDevices().then(sourceInfos => {
            // console.log(sourceInfos);
            let videoSourceId;
            for (let i = 0; i < sourceInfos.length; i++) {
                const sourceInfo = sourceInfos[i];
                if (sourceInfo.kind === "videoinput" && sourceInfo.facing === (true ? "front" : "back")) {
                    videoSourceId = sourceInfo.deviceId;
                }
            }
            mediaDevices.getUserMedia({
                audio: true,
                video: {
                    mandatory: {
                        minWidth: 500,
                        minHeight: 300,
                        minFrameRate: 30
                    },
                    facingMode: (true ? "user" : "environment"),
                    optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
                }
            })
                .then(stream => {

                    // Got stream!

                    // console.log('getUserMedia stream', stream);

                    this.setState({
                        localStream: stream,
                    })

                })
                .catch(error => {
                    // Log error
                    console.log('stream get error', error);
                });
        });

    }


    componentDidMount() {

        this.getStream();

        var data = this.props.navigation.getParam('data');

        console.log('data', data)

    //     if (data.auth) {

    //         let connection = new signalR.HubConnectionBuilder()
    //             .withUrl(global.API_URL + "/livechat", {
    //                 accessTokenFactory: () => {
    //                     return data.auth.token;
    //                 },
    //                 logging: signalR.LogLevel.Information
    //             })
    //             .build();         
    // } 

} 
 
    start() {
        var self = this;
        let timer = setInterval(() => {
            var num = (Number(this.state.miliseconds) + 1).toString(),
                count = this.state.counter;

            if (Number(this.state.miliseconds) == 99) {
                count = (Number(this.state.counter) + 1).toString();
                num = '00';
            }

            self.setState({
                counter: count.length == 1 ? '0' + count : count,
                miliseconds: num.length == 1 ? '0' + num : num
            });
        }, 0);
        this.setState({ timer });
    }

    onButtonStart() {

        this.start();
        this.setState({ startDisabled: true, stopDisabled: false });

    }

    onButtonStop() {
        clearInterval(this.state.timer);
        this.setState({ startDisabled: false, stopDisabled: true });
    }

    onButtonClear() {
        this.setState({
            timer: null,
            counter: '00',
            miliseconds: '00'
        });
    }

    getFormattedTime(time) {
        this.currentTime = time;
    };

    render() {
        return (
          
                    <View style={{flex: 1}}>
                        <View style={{ flex: 0.05 }}></View>
                        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'space-around' }}>
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: '700', color: '#afb0b3' }}>
                                    {this.state.audioCallStatus == 'connected' ? '00:' + this.state.counter : this.state.audioCallStatus}
                                </Text>
                            </View>
                        </View>
        
                        <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                            <Animatable.View duration={1000} animation={this.state.audioIconAnimation} iterationCount={this.state.audioIconIteration} style={{
                                borderRadius:
                                    // 120,
                                    Dimensions.get('window').width / 2,
                                // borderWidth: 0.5, borderColor: '#afb0b3',
                                paddingHorizontal: 30, paddingVertical: 30, elevation: 1,
                            }}>
                                <Image style={{ width: 90, height: 90 }}
                                    source={require('../../assets/icons/android/drawable-xxxhdpi/pakistan_takaful_logo_colorful.png')} />
                            </Animatable.View>
                        </View>
        
                        <View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            {/* 
                        <View style={{
                            borderRadius: Dimensions.get('window').width / 2,
                            borderWidth: 0.5,
                            borderColor: '#afb0b3',
                            padding: 15
                        }}>
                            <Image style={{width: 30, height: 30}}
                                   source={require('../../assets/icons/android/drawable-xxxhdpi/loud_speaker.png')}/>
                        </View> */}
        
                            {/* <View style={{ borderRadius:Dimensions.get('window').width / 2, borderWidth: 0.5, borderColor: '#afb0b3', padding: 15}}> */}
                            {/* <Ripple
                            size={10}
                            onPress={() => {
                                this.setState({
                                    chatView
                                })
                            }}
                            style={{
                                borderRadius: Dimensions.get('window').width / 2,
                                borderWidth: 0.5,
                                borderColor: '#afb0b3',
                                padding: 15
                            }}>
                            <Image style={{width: 30, height: 30}}
                                   source={require('../../assets/icons/android/drawable-xxxhdpi/video_request.png')}/>
                        </Ripple> */}
                            {/* </View> */}
        
                            {/* <View style={{
                            borderRadius: Dimensions.get('window').width / 2,
                            borderWidth: 0.5,
                            borderColor: '#afb0b3',
                            padding: 15
                        }}>
                            <Image style={{width: 30, height: 30}}
                                   source={require('../../assets/icons/android/drawable-xxxhdpi/mute_mic.png')}/>
                        </View> */}
        
                        </View>
        
                        <View style={{
                            flex: 0.2,
                            borderRadius: Dimensions.get('window').width / 2,
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'space-around'
                        }}>
                            <Ripple
                                onPress={() => {
                                    this.onButtonStop()
                                    this.setState({
                                        audioCallStatus: null,
                                        chatView: 'chat'
                                    })
                                    if (this.state.connection.state === signalR.HubConnectionState.Connected) {
                                        this.state.connection.stop();
                                        this.setState({
                                            chatView: 'chat'
                                        })
                                    }
                                    if (this.state.peerConn) {
                                        this.state.peerConn.close();
                                    }
                                }}
                                style={{
                                    borderRadius: Dimensions.get('window').width / 2, borderWidth: 0,
                                    backgroundColor: '#C62828',
                                    padding: 15, elevation: 3
                                }}>
                                <Image style={{ width: 30, height: 30 }}
                                    source={require('../../assets/icons/android/drawable-xxxhdpi/call_decline.png')} />
                            </Ripple>
                        </View>
        
        
                        <StatusBar translucent backgroundColor="#ffffff" barStyle='dark-content' />
                    </View>
                )
    }

}
const options = {
    container: {
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 5,
        width: 220,
    },
    text: {
        fontSize: 30,
        color: '#FFF',
        marginLeft: 7,
    }
};

const styles = StyleSheet.create({
    respondBtns: {
        marginVertical: 10, flexDirection: 'row', justifyContent: 'space-around', padding: 15, alignItems: 'flex-end'
    },
    audioCallScreen: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        marginTop: StatusBar.currentHeight
    },
    screen: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        marginTop: StatusBar.currentHeight
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
