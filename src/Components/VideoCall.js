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
    TouchableOpacity
} from 'react-native'
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
import {RNCamera, FaceDetector} from 'react-native-camera';
// import { Divider } from 'react-native-paper'
import {BarChart, Grid} from 'react-native-svg-charts'
import {Defs, LinearGradient, Stop} from "react-native-svg";
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

export default class VideoCall extends Component {

    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
        this.state = {
            onBack: true,
            camType: 'front',
            callStatus: 'Connecting To a Doctor...',
            videoStatus: 'fullScreen'
        }
    }

    componentDidMount() {
        {
            setTimeout(() => {
                this.setState({
                    callStatus: '00:00',
                    videoStatus: 'box'
                })
            }, 5000)
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

    cameraChange() {
        if (this.state.camType == 'front') {
            this.setState({
                camType: 'back'
            })
        } else if (this.state.camType == 'back') {
            this.setState({
                camType: 'front'
            })
        }

    }

    takePicture = async () => {
        if (this.camera) {
            const options = {quality: 0.5, base64: true};
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
        }
    }

    render() {
        return (
            //adding animation
            <Animatable.View style={styles.screen}>

               { (this.props.remoteStream && this.props.showRemoteVideo ) ?
                            <RTCView streamURL={this.props.remoteStream.toURL()} style={{flex: 1}}> 
                                   <View style={{flex: 0.8}}></View>
                            <View style={{alignItems: 'center'}}>
                                <Ripple
                                    size={10}
                                    onPress={() => this.props.navigation.navigate('User')}
                                    style={{
                                        borderRadius: Dimensions.get('window').width / 2,
                                        backgroundColor: '#C62828',
                                        padding: 15
                                    }}
                                >
                                    <Image style={{width: 30, height: 30}}
                                        source={require('../../assets/icons/android/drawable-xxxhdpi/call_decline.png')}/>
                                </Ripple>
                            </View>
                            <View style={{
                                flex: 0.2,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around'
                            }}>

                                <Ripple
                                    size={10}
                                    onPress={() => this.cameraChange()}
                                >
                                    <Image style={{width: 30, height: 30}}
                                        source={require('../../assets/icons/android/drawable-xxxhdpi/camSwap.png')}/>
                                </Ripple>

                                {/* <View style={{ borderRadius:Dimensions.get('window').width / 2, borderWidth: 0.5, borderColor: '#afb0b3', padding: 15}}> */}
                                <Ripple
                                    size={10}
                                    onPress={() => this.props.navigation.navigate('Call')}
                                >
                                    <Image style={{width: 30, height: 30}}
                                        source={require('../../assets/icons/android/drawable-xxxhdpi/disable_video.png')}/>
                                </Ripple>
                                {/* </View> */}

                                <Ripple
                                    size={10}
                                    onPress={() => this.props.navigation.navigate('VideoCall')}
                                >
                                    <Image style={{width: 30, height: 30}}
                                        source={require('../../assets/icons/android/drawable-xxxhdpi/video_mic_mute.png')}/>
                                </Ripple>

                        </View>


                        {
                        (this.props.localStream && this.props.showRemoteVideo) ?
                            <RTCView style={styles.camVideo} streamURL={this.props.localStream.toURL()} /> : null
                        }

                            </RTCView> : null
                    }
                    
                <StatusBar hidden={true} barStyle='dark-content'/>

            </Animatable.View>
        )
    }

}

const styles = StyleSheet.create({
    camVideo: {
        height: '25%',
        width: '1%',
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        position: "absolute",
        bottom: 120,
        right: 80,
        // paddingRight: 10
    },
    screen: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        // marginTop: StatusBar.currentHeight
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
    container: {flex: 1, justifyContent: "center", alignItems: 'center'},
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
