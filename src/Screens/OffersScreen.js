import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, PixelRatio, StatusBar, BackHandler, FlatList } from 'react-native'

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
import Ripple from 'react-native-material-ripple';
import { TouchableRipple, Modal, Portal, Provider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Card from '../Components/Card'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';


export default class OffersScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('header', 'null'),
    });
    data = this.props.navigation.getParam('data')
    brandTitle = this.props.navigation.getParam('header')
    constructor(props) {
        super(props)
        this.state = {
            onBack: true,
            locationModal: false,
            selectedOutlet: '',
            brandTitle: this.brandTitle,
            offersList: [
                {
                    title: `Cataract Surgery `,
                    validity: 'Valid Until 30 Dec 2019',
                    logo: require('../../assets/icons/android/drawable-xxxhdpi/aku-logo.png'),
                    percentage: '20% OFF'
                },
                {
                    title: `Eye Surgery `,
                    validity: 'Valid Until 30 Dec 2019',
                    logo: require('../../assets/icons/android/drawable-xxxhdpi/aku-logo.png'),
                    percentage: '15% OFF'
                },
                {
                    title: `General Surgery `,
                    validity: 'Valid Until 30 Dec 2019',
                    logo: require('../../assets/icons/android/drawable-xxxhdpi/aku-logo.png'),
                    percentage: '10% OFF'
                },
            ],

            outletList: [
                {
                    title: `Karim Abad`,
                    validity: 'Valid Until 30 Dec 2017',
                    logo: require('../../assets/icons/android/drawable-xxxhdpi/aku-logo.png'),
                    percentage: '20% OFF'
                },
                {
                    title: `Garder East`,
                    validity: 'Valid Until 30 Dec 2017',
                    logo: require('../../assets/icons/android/drawable-xxxhdpi/aku-logo.png'),
                    percentage: '20% OFF'
                },
                {
                    title: `Zamzama Dha Phase 5`,
                    validity: 'Valid Until 30 Dec 2017',
                    logo: require('../../assets/icons/android/drawable-xxxhdpi/aku-logo.png'),
                    percentage: '20% OFF'
                }
            ]
            // offersList: this.data.offersList,
            // outletList: this.data.outletList
            // {
            //     title: `20'' Half Pizza `,
            //     validity: 'Valid Until 30 Dec 2017',
            //     logo: require('../../assets/icons/android/drawable-xxxhdpi/aku-logo.png'),
            //     percentage: '20% OFF'
            // },
        }
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    componentDidMount() {
        const { title } = this.state.outletList[0]
        this.setState({
            selectedOutlet: title
        })
    }

    renderOffersList(item) {
        return (
            <Card style={{ flex: 0.2 }}>
                <Ripple
                    rippleColor="rgba(0, 0, 0, 0)"
                    rippleSize={176}
                    rippleDuration={400}
                >
                    <View style={{ flex: 0.5, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', flex: 1, marginHorizontal: 10, marginVertical: 8, }}>
                        <Text style={{
                            fontSize: 15,
                            color: '#3a3a3a',
                            fontWeight: '700'
                        }}>
                            {item.title}
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            color: '#a5a5a5'
                        }}>
                            {item.validity}
                        </Text>
                    </View>


                    <View style={{ flex: 0.40, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', flex: 1, marginHorizontal: 10, marginVertical: 8, }}>
                        <Text style={{
                            fontSize: 15,
                            color: '#a5a5a5',
                            // fontWeight: '700'
                        }}>
                            * Tax applicable
                   </Text>
                    </View>

                    <View style={{ flex: 0.10, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', flex: 1, marginHorizontal: 10, marginVertical: 8, }}>
                        <Button
                            type="outline"
                            title='-' containerStyle={{ backgoundColor: '#ffffff', color: '#ffffff' }}>
                        </Button>
                        <Text>00</Text>
                        <Button
                            type="outline"
                            title='+' containerStyle={{ backgoundColor: '#ffffff', color: '#ffffff' }}>
                        </Button>
                    </View>

                </Ripple>
            </Card>
        )
    }

    renderOutletList(item) {
        return (
            <Ripple
                onPress={() => { this.setState({ selectedOutlet: item.title, locationModal: false }) }}
                rippleColor="rgba(0, 0, 0, 0.32)"
                // rippleSize={176}
                rippleDuration={500}
                style={{ display: 'flex', flex: 1, flexDirection: 'row', paddingHorizontal: 10, backgroundColor: '#ffffff', borderBottomWidth: 1, borderColor: '#e0e0e0' }}
            >
                <View style={{
                    flexDirection: 'column',
                    flex: 0.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 5,
                }}>
                    <Image style={{ width: 20, height: 20, }} source={require('../../assets/icons/android/drawable-xxxhdpi/location_marker.png')} />
                </View>

                <View style={{ flex: 0.9, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', flex: 1, marginHorizontal: 10 }}>
                    <Text style={{
                        fontSize: 15,
                        color: '#3a3a3a',
                        fontWeight: '700'
                    }}>{item.title}</Text>
                </View>

            </Ripple>
        )
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

    // offersList() {
    //     return (


    /* <FlatList
        data={this.state.offersList}
        renderItem={({ item, index, separators }) => (
            this.renderOffersList(item)
        )}
    /> */
    // </ScrollView>
    // )
    // }

    locationPicker() {
        return (
            <Ripple
                rippleColor="rgba(0, 0, 0, 0.32)"
                rippleSize={176}
                rippleDuration={400}
                style={{ flex: 1, display: 'flex', flexDirection: 'row', paddingHorizontal: 10, backgroundColor: '#ffffff', borderWidth: 0.5, borderColor: '#e0e0e0', }}
                onPress={() => { this.setState({ locationModal: true }) }}
            >


                <View style={{ flex: 0.8, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', flex: 1, marginHorizontal: 10 }}>
                    <Text style={{
                        fontSize: 15,
                        color: '#3a3a3a',
                        fontWeight: '700'
                    }}>{this.state.selectedOutlet}</Text>
                </View>

                <View style={{
                    flexDirection: 'column',
                    flex: 0.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 5,
                }}>
                    <Image style={{ width: 20, height: 20, }} source={require('../../assets/icons/android/drawable-xxxhdpi/expand_arrow.png')} />
                </View>
            </Ripple>
        )
    }

    handleCount(item) {
        if (item.selected) {
            item.setState({
                ...this.state.offersList,
                selected: false
            })
        } else if (item.selected == false) {
            item.setState({
                selected: true
            })
        }
    }


    render() {
        return (
            <Provider style={styles.screen}>

                <View style={{
                    flex: 0.3,
                    flexDirection: 'column',
                    elevation: 3,
                    // paddingTop: StatusBar.currentHeight,
                }}>

                    <ImageBackground
                        style={{ width: '100%', height: '100%', }} source={require('../../assets/icons/android/drawable-xxxhdpi/agaKhanMainScreen.jpg')}
                    >
                        <View style={{ flex: 0.5, backgroundColor: 'rgba(0,0,0,0.4)' }}>
                            <View style={{ flex: 0.5, alignItems: 'flex-start', paddingLeft: 10, paddingTop: 10}}>
                        <Ripple
                        onPress={() => {this.props.navigation.goBack()}}
                        >
                        <Image style={{ width: 30, height: 24, }} source={require('../../assets/icons/android/drawable-xxxhdpi/white_back.png')} />
                        </Ripple>
                        </View>
                        </View>
                        <View style={{ flex: 0.5, backgroundColor: 'rgba(0,0,0,0.4)', flexDirection: 'row', }}>


                            <View style={{ flex: 0.5, alignItems: 'flex-start', justifyContent: 'center', marginHorizontal: 20 }}>
                                <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '700' }}>
                                    {this.state.brandTitle}</Text>
                            </View>

                            <View style={{ flex: 0.5, alignItems: 'flex-end', justifyContent: 'center', marginHorizontal: 20 }}>
                                <View style={{ flex: 0.4, alignItems: 'flex-end', justifyContent: 'center', borderRadius: 5, borderWidth: 1, borderColor: "#8f8f91", paddingVertical: 0, paddingHorizontal: 10 }}>
                                    <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '700' }}>
                                        {this.state.selectedOutlet}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>

                    {this.locationModal()}
                </View>

                <View style={{
                    backgroundColor: '#eeeeee',
                    flex: 0.6,
                }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 0.05 }}></View>
                        <ScrollView
                            showsVerticalScrollIndicator={false}>
                            {this.state.offersList.map((item) => {
                                return (
                                    <Ripple
                                        rippleColor="rgba(0, 0, 0, 0)"
                                        rippleSize={176}
                                        rippleDuration={400}
                                        style={{
                                            flex: 1,
                                            elevation: 1,
                                            backgroundColor: 'white',
                                            paddingTop: 10,
                                            padding: 15,
                                            borderWidth: 0.2,
                                            borderColor: '#767676',
                                            borderRadius: 5,
                                            backgroundColor: '#FFFFFF',
                                            marginTop: 10,
                                            marginHorizontal: 10
                                        }}
                                    >
                                        <View style={{
                                            flex: 8, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', flex: 1, marginHorizontal: 0, marginVertical: 8, paddingBottom: 10, borderBottomWidth: 0.2,
                                            borderColor: '#767676'
                                        }}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{
                                                    fontSize: 15,
                                                    color: '#3a3a3a',
                                                    fontWeight: '700'
                                                }}>
                                                    {item.title}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{
                                                    fontSize: 14,
                                                    color: '#ff7900'
                                                }}>
                                                    {item.validity}
                                                </Text>
                                            </View>
                                        </View>


                                        <View style={{ flex: 6, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', flex: 1, }}>
                                            <Text style={{
                                                fontSize: 15,
                                                color: '#a5a5a5',
                                            }}>
                                                * Tax applicable
                                           </Text>
                                        </View>

                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                                            <View style={{ flex: 0.3, flexDirection: 'row' }}>
                                                {item.selected == false ?
                                                    <Ripple
                                                        onPress={() =>
                                                            this.handleCount(item)
                                                        }
                                                        rippleColor="rgba(0, 0, 0, 0.32)"
                                                        rippleSize={50}
                                                        rippleDuration={400}
                                                        style={styles.disabledButton}
                                                    >
                                                        <Image style={{ width: 5, height: 15, }}
                                                            source={require('../../assets/icons/android/drawable-xxxhdpi/minus-disabled.png')} />
                                                    </Ripple> :
                                                    <Ripple
                                                        rippleColor="rgba(0, 0, 0, 0.32)"
                                                        rippleSize={50}
                                                        rippleDuration={400}
                                                        style={styles.enabledButton}
                                                    >
                                                        <Image style={{ width: 5, height: 15, }}
                                                            source={require('../../assets/icons/android/drawable-xxxhdpi/minus-count.png')} />
                                                    </Ripple>
                                                }
                                                <View>
                                                    <Text>00</Text>
                                                </View>

                                                {item.selected == false ?
                                                    <Ripple
                                                        onPress={() =>
                                                            this.handleCount(item)
                                                        }
                                                        rippleColor="rgba(0, 0, 0, 0)"
                                                        rippleSize={176}
                                                        rippleDuration={400}
                                                        style={styles.enabledButton}>
                                                        <Image style={{ width: 12, height: 12, }}
                                                            source={require('../../assets/icons/android/drawable-xxxhdpi/plus-count.png')} />
                                                    </Ripple> :
                                                    <Ripple
                                                        rippleColor="rgba(0, 0, 0, 0)"
                                                        rippleSize={176}
                                                        rippleDuration={400}
                                                        style={styles.disabledButton}>
                                                        <Image style={{ width: 12, height: 12, }}
                                                            source={require('../../assets/icons/android/drawable-xxxhdpi/plus-disabled.png')} />
                                                    </Ripple>
                                                }

                                            </View>
                                        </View>

                                    </Ripple>
                                )
                            })
                            }
                        </ScrollView>

                    </View>
                </View>
                <View style={{ flex: 0.1, backgroundColor: '#132d81', flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 20 }}>
                    <View style={{ flex: 0.4, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text style={{
                            fontSize: 15,
                            color: '#ffffff',
                        }}>
                            1 Deals Selected
                        </Text>
                    </View>
                    <View style={{ flex: 0.2, flexDirection: 'column', justifyContent: 'center' }}>

                    </View>
                    <View style={{ flex: 0.4, flexDirection: 'column', justifyContent: 'center' }}>
                        <Ripple
                            // onPress={() =>
                            //     this.handleCount(item)
                            // }
                            rippleColor="rgba(0, 0, 0, 0.50)"
                            rippleSize={176}
                            rippleDuration={400}
                            style={{backgroundColor: '#0c6ed1', flex: 0.6, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 20}}>
                            <Text style={{
                                fontWeight: '700',
                                fontSize: 15,
                                color: '#ffffff',
                            }}>
                                Next
                            </Text>
                        </Ripple>
                    </View>
                </View>
                <StatusBar backgroundColor="#000000" translucent hidden={true}
                />
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    enabledButton: {
        backgroundColor: '#028bff', flex: 0.5, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 5
    },
    disabledButton: {
        backgroundColor: '#ffffff', flex: 0.5, borderWidth: 1, borderColor: "#eaebed", marginHorizontal: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 5
    },
    screen: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
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
