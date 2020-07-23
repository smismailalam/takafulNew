import React, { Component } from 'react';
import { BackHandler, DeviceEventEmitter , View, Button, StatusBar, Text, Image, StyleSheet, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
const { height, width } = Dimensions.get('window');
import Card from '../Components/Card';
const LATITUDE = 24.8229883;
const LONGITUDE = 67.0376633;
const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '50%',
        width: width,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    main: {
        borderRadius: 10,
        elevation: 1,
      },
    titleLogo: {
        width: 28,
        height: 28,
        marginRight:10
    },
    header: {
      flex: 2,
      flexDirection: 'row',
      marginBottom: 30,
    },
});
const GOOGLE_MAPS_APIKEY = 'AIzaSyBm_bk2Uc0_NCubomW83ropHhJjY8cdmIc';
// const GOOGLE_MAPS_APIKEY = 'AIzaSyBMSaw1_T62ifQfyoqKgi41xa-knyG521A';

export default class Live extends React.Component {

    MapView: null;

    Camera = {
        center: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
        },
        zoom: 0,
        altitude: 0,
        pitch: 0,
        heading: 0,
    };

    CMap = {};


    Timers = [];

    constructor(props) {

        super(props);

        this.state = {
            data: [],
            currentLat: 0,
            currentLng: 0,
            IgnitionStatus: 0,
            IgnitionStatusImage: 0,
            Location:'',
            origin: {latitude: 37.3318456, longitude: -122.0296002},
            currentLocation: "",
            destination: {latitude: 37.771707, longitude: -122.4053769},
            isload: false,
            drivingTime: null,
            walkingTime: null,
            bicyclingTime: null,
            transitTime: null,
            latitude:0,
            longitude:0,
            drivingDistance:0,
            walkingDistance:0,
            cycleDistance:0,
            drivingTime:0,
            walkingTime:0,
            cycleTime:0,

        };
    }
    componentDidMount(){
        setTimeout(() => {
            const { navigation } = this.props;
            var lat = navigation.getParam('lat', 'NO-ID');           
            var long = navigation.getParam('long', 'NO-ID');
            var name = navigation.getParam('name', 'NO-ID');

            var lat1 = global.lat ? global.lat : '24.831574';
            var long1 = global.long ? global.long : '67.073809';

            var url = `${global.API_URL}/api/Salamti/CalculateETA?startX=${long}&startY=${lat}&endX=${long1}&endY=${lat1}`;
            try {
                axios
                .get(url)
                .then(response => {
                    if (response.status === 200) {
                        var drivingDistance=0;
                        var drivingTime=0;
                        var walkingDistance=0;
                        var walkingTime=0;
                        var cycleDistance=0;
                        var cycleTime=0;
                        var res = response.data;
                        console.log(res[1].distance)
                        if(res[0]){
                            drivingDistance = (res[0].distance) / 1000;
                            drivingTime = (res[0].time);
                        }
                        if(res[1]){
                            walkingDistance = (res[1].distance) / 1000;
                            walkingTime = (res[1].time)
                        }
                        if(res[2]){
                            cycleDistance = (res[2].distance) / 1000;
                            cycleTime = (res[2].time) 
                        }
                        this.setState({
                            latitude:lat,
                            longitude:long,
                            name,
                            drivingDistance,
                            drivingTime,
                            walkingDistance,
                            walkingTime,
                            cycleDistance,
                            cycleTime
                        },()=>{
                            this.MapView.fitToElements(true);
                        })
                    }
                })
                .catch(error => {});
            } catch (error) {}
            // this.setState({
            //     latitude:lat,
            //     longitude:long,
            //     name
            // })
            
        }, 2000);

        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            const { navigation } = this.props;
            var parent = navigation.getParam('parent', 'NO-ID');
            console.log('parent' , parent)
            if(parent == 'home'){
                this.props.navigation.navigate('User');
            }
            else{
                this.props.navigation.navigate('Hospital');
            }
            return true;
        });
    }
    componentWillUnmount() {
      this.backHandler.remove();
    }
    timeFormat(str){
        if(str){
            str = str.toString();
            var split = str.split(":");
            var hr = split[0] == '00' ? ' ': split[0] + ' hr ';
            var min = split[1] == '00' ? ' ': split[1] + ' min ';
            var seconds = split[2] == '00' ? ' ': split[2]+ ' s';
            return hr+min+seconds;
        }
    }

    render() {        
        return (
            <View style={{ flex: 1}}>
                <View style={{ flex:5 }}>
                    <MapView
                    ref={(mapView) => {
                        this.MapView = mapView;

                    }}
                    style={styles.map}
                    initialRegion={{
                        latitude: global.lat,
                        longitude: global.long,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    >
                        <Marker coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}>
                            <View style={{paddingHorizontal: 10, paddingVertical: 10, backgroundColor: 'red', flex: 6.5, alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column', marginLeft: 10,borderRadius: 10  }}>
                                <View style={{ flex: 1, alignContent:'center' , width:75 }}>
                                    <Text style={{ color:'#fff', fontSize:8, textAlign:'center', fontWeight:'bold' }}>{this.state.name}</Text>
                                    <Text style={{ color:'#fff', fontSize:8 }}>{this.state.Location}</Text>
                                </View>
                            </View> 
                            <View style={{ alignItems:'center' }}>
                                <Image source={require('../../assets/icons/android/drawable-xxxhdpi/you_are_here.png')} style={{ width: 24, height: 24 }} />
                            </View>
                        </Marker>
                        <Marker coordinate={{ latitude: global.lat, longitude: global.long }}>
                            <View style={{paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#000', flex: 6.5, alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column', marginLeft: 10,borderRadius: 10  }}>
                                <View style={{ flex: 1, alignContent:'center' , width:75 }}>
                                    <Text style={{ color:'#fff', fontSize:8, textAlign:'center', fontWeight:'bold' }}>You are here</Text>
                                    <Text style={{ color:'#fff', fontSize:8 }}>{this.state.Location}</Text>
                                </View>
                            </View> 
                            <View style={{ alignItems:'center' }}>
                                <Image source={require('../../assets/icons/android/drawable-xxxhdpi/you_are_here.png')} style={{ width: 24, height: 24 }} />
                            </View>
                        </Marker>                    
                        <MapViewDirections
                            origin={{latitude: this.state.latitude, longitude: this.state.longitude}}
                            destination={{latitude: global.lat, longitude: global.long}}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="purple"
                        />
                    </MapView>                
                </View>
                <View style={{ flex: 1, margin:10, padding:15 , borderRadius:15 , backgroundColor:'#fff' }}>
                    <View style={{flex:1, flexDirection:'row' , marginBottom:15}} >
                        <View style={styles.titleLogoView}>
                            <Image
                                style={styles.titleLogo}
                                source={require('../../assets/icons/android/drawable-xxxhdpi/eta.png')}
                            />
                        </View>
                        <View>
                            <Text style={{fontSize: 16, fontFamily:'Ubuntu-Medium', ...styles.headerText}}>
                                Estimated times of arrival
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex:3, flexDirection:'row' }}>
                        <View style={{ flex:1, alignItems:'center' }}>
                            <View style={{ marginBottom:5 }}>
                                <Image
                                    style={styles.titleLogo}
                                    source={require('../../assets/icons/android/drawable-xxxhdpi/car.png')}
                                />
                            </View>
                            <View style={{ marginBottom:5 }}>
                                <Text style={{ fontSize:12, fontFamily:'Ubuntu-Regular' }}>{ (this.state.drivingDistance).toFixed(2) }km </Text>
                            </View>
                            <View style={{ marginBottom:5 }}>
                                <Text style={{ fontSize:12, fontFamily:'Ubuntu-Regular' }}>{ this.timeFormat(this.state.drivingTime) } </Text>
                            </View>
                        </View>
                        <View style={{ flex:1, alignItems:'center' }}>
                            <View style={{ marginBottom:5 }}>
                                <Image
                                    style={styles.titleLogo}
                                    source={require('../../assets/icons/android/drawable-xxxhdpi/walking.png')}
                                />
                            </View>
                            <View style={{ marginBottom:5 }}>
                                <Text style={{ fontSize:12, fontFamily:'Ubuntu-Regular' }}>{ (this.state.walkingDistance).toFixed(2) }km </Text>
                            </View>
                            <View style={{ marginBottom:5 }}>
                                <Text style={{ fontSize:12, fontFamily:'Ubuntu-Regular' }}>{ this.timeFormat(this.state.walkingTime) } </Text>
                            </View>
                        </View>
                        {/* <View style={{ flex:1, alignItems:'center' }}>
                            <View>
                                <Image
                                    style={styles.titleLogo}
                                    source={require('../../assets/icons/android/drawable-xxxhdpi/motorCycle.png')}
                                />
                            </View>
                            <View>
                                <Text>{ (this.state.cycleDistance).toFixed(2) }km </Text>
                            </View>
                            <View>
                                <Text>{  this.timeFormat(this.state.cycleTime) } </Text>
                            </View>
                        </View> */}
                    </View>
                </View>
            </View>
        );
    }
}