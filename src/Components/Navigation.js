import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ImageBackground, Dimensions} from 'react-native'

class Navigation extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <View style={{...styles.navigation, ...this.props.style}}>
                <View style={styles.imageView}>
                    <Image
                        style={{width: 24, height: 24}}
                        source={require('../../assets/icons/android/drawable-xxxhdpi/health_care_icon_inactive.png')}
                    />
                    <Text style={styles.navText}>Health</Text>
                </View>

                <View style={styles.imageView}>
                    <Image
                        style={{width: 24, height: 24}}
                        source={require('../../assets/icons/android/drawable-xxxhdpi/sports_car_icon_active.png')}
                    />
                    <Text style={styles.navText}>Motor</Text>
                </View>

                <View style={styles.imageView}>
                    <Image
                        style={{width: 24, height: 24}}
                        source={require('../../assets/icons/android/drawable-xxxhdpi/home_icon_inactive.png')}
                    />
                    <Text style={styles.navText}>Home</Text>
                </View>

                <View style={styles.imageView}>
                    <Image
                        style={{width: 24, height: 24}}
                        source={require('../../assets/icons/android/drawable-xxxhdpi/fire_icon_inactive.png')}
                    />
                    <Text style={styles.navText}>Fire</Text>
                </View>

                <View style={styles.imageView}>
                    <Image
                        style={{width: 24, height: 24}}
                        source={require('../../assets/icons/android/drawable-xxxhdpi/more_icon_inactive.png')}
                    />
                    <Text style={styles.navText}>Misc</Text>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
    },
    navText: {
        color: '#ffffff',
        opacity: 0.40,
    },
    imageView: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    navigation: {
        // paddingHorizontal: '10%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        // alignItems: 'center',
        // paddingTop: 10,
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 5,
        marginHorizontal: 5,
        flex: 4
    },
    main: {
        flexDirection: 'column',
        borderColor: '#F2F2F2',
        width: '100%',
        height: 200,
        flex: 1,
        marginHorizontal: 10,
        // paddingLeft: 14,
        // paddingRight: 7,
        padding: 0,
        paddingTop: 10,
        elevation: 0,
        borderWidth: 1,
        borderRadius: 10,
    },
    percentage: {
        borderBottomColor: '#4DE9DF',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
        marginTop: 15
    }
})

export default Navigation
