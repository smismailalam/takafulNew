import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { CollapseHeader, Collapse, CollapseBody } from "accordion-collapse-react-native";


import { Separator } from 'native-base';
// import { AccordionList } from 'accordion-collapse-react-native/lib';

class NestedHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        console.log(this.props.state)
        return (
            <Collapse>
                {this.props.state[0] ? this.props.state[0].map((marker, i) => (
                    <CollapseHeader style={{ height: 45 }} >
                        <Separator bordered style={{ backgroundColor: '#fff' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 2 }}>
                                    {/* <Text style={{ fontFamily: 'Heebo-Bold', color: '#000', fontSize: 14 }}>  */}
                                    {/* {this.props._header(marker[0].Start)}</Text> */}
                                </View>
                                <View style={{ flex: 3, justifyContent: 'center' }}>
                                    {marker.length > 1 ? <Text style={{ fontSize: 12, fontFamily: 'Heebo-Bold', color: '#000' }}>
                                        Visited <Text style={{ color: '#3498db', fontSize: 12 }}> {marker.length}</Text> times
              </Text> :
                                        <Text style={{ fontSize: 12, fontFamily: 'Heebo-Bold', color: '#000' }}>
                                            Visited <Text style={{ color: '#3498db', fontSize: 12 }}> {marker.length}</Text> time
              </Text>}

                                </View>
                            </View>
                        </Separator>
                    </CollapseHeader>
                )) : null}
            </Collapse>
        )
    }
}

class NestedBody extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                {
                    day: 'Mondays',
                    state: []
                },
                {
                    day: 'Tuesdays',
                    state: []
                },
                {
                    day: 'Wednesdays',
                    state: []
                },
                {
                    day: 'Thursdays',
                    state: []
                },
                {
                    day: 'Fridays',
                    state: []
                },
                {
                    day: 'Saturdays',
                    state: []
                },
                {
                    day: 'Sundays',
                    state: []
                },
            ]
        }
    }



    render() {
        return (
            <CollapseBody style={{ backgroundColor: '#fff' }}>
                {this.props.state[0] ? this.props.state[0].map((marker, i) => (
                    <View style={styles.timelineDetails}>
                        {marker ? marker.map((m, ii) => (
                            <View key={ii} style={{ ...styles.timelineDetail }}>
                                <View style={styles.stopTime}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        
                                    </View>
                                    <View style={{ flex: 9 }}>
                                        {/* <Text style={styles.headfontStyle}>
{this.props._convertDate(m.Start)}
</Text> */}
                                    </View>
                                </View>

                                <View style={styles.difference}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        
                                    </View>
                                    <View style={{ flex: 9, }}>
                                        {/* <Text style={{ ...styles.headfontStyle, fontSize: 10 }}>{
  // this.props._differnceHours(m.Start, m.End)}
  </Text> */}
                                    </View>
                                </View>

                                <View style={styles.startTime}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        
                                    </View>
                                    <View style={{ flex: 9, }}>
                                        {/* <Text style={styles.headfontStyle}>
{this.props._convertDate(m.End)}
</Text> */}
                                    </View>
                                </View>
                            </View>
                        )) : null}
                    </View>
                )) : null}
            </CollapseBody>
        )
    }
}





class MfpBody extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                {
                    day: 'Mondays',
                    state: []
                },
                {
                    day: 'Tuesdays',
                    state: []
                },
                {
                    day: 'Wednesdays',
                    state: []
                },
                {
                    day: 'Thursdays',
                    state: []
                },
                {
                    day: 'Fridays',
                    state: []
                },
                {
                    day: 'Saturdays',
                    state: []
                },
                {
                    day: 'Sundays',
                    state: []
                },
            ]
        }
    }

    componentDidMount() {
        var param = this.props.frequentLocations;
        var state = {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
        }

        var result = this._groupBy(param, function (item) {
            var a = item.Start;
            a = a.split(" ");
            return [a[0]];
        });

        var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        for (var i = 0; i < result.length; i++) {
            var aa = result[i][0].Start
            var dd = new Date(aa);
            var dayIndex = dd.getDay();
            var day = days[dayIndex];
            if (day == "monday") {
                state.sunday.push(result[i]);
            }
            else if (day == "tuesday") {
                state.monday.push(result[i]);
            }
            else if (day == "wednesday") {
                state.tuesday.push(result[i]);
            }
            else if (day == "thursday") {
                state.wednesday.push(result[i]);
            }
            else if (day == "friday") {
                state.thursday.push(result[i]);
            }
            else if (day == "saturday") {
                state.friday.push(result[i]);
            }
            else if (day == "sunday") {
                state.saturday.push(result[i]);
            }
        }

        var list = [...this.state.list];
        // console.log(list)
        list.map((item, index) => {
            if (item.day === 'Mondays') {
                item.state.push(state.monday)
            } else if (item.day === 'Tuesdays') {
                item.state.push(state.tuesday)
            } else if (item.day === 'Wednesdays') {
                item.state.push(state.wednesday)
            } else if (item.day === 'Thursdays') {
                item.state.push(state.thursday)
            } else if (item.day === 'Fridays') {
                item.state.push(state.friday)
            } else if (item.day === 'Saturdays') {
                item.state.push(state.saturday)
            } else if (item.day === 'Sundays') {
                item.state.push(state.sunday)
            }
        })

        this.setState({
            // name: name,
            frequentLocations: param,
            list: list
        });
    }


    header(item) {
        return (
            <NestedHeader
                state={item.state}
            //  _header = {this.props._header}
            />
        )
    }

    _groupBy(array, f) {
        var groups = {};
        array.forEach(function (o) {
            var group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        return Object.keys(groups).map(function (group) {
            return groups[group];
        })
    }

    body(item) {
        return (
            <NestedBody
                state={item.state}
            //  _differnceHours = {this.props._differnceHours}
            //  _convertDate={this._convertDate}
            />
        )
    }


    render() {
        // console.log( this.props.state[0] ? this.props.state[0]: 'null')
        return (
            <CollapseBody style={{ backgroundColor: '#fff' }}>
                {this.props.state[0] ? this.props.state[0].map((marker, i) => (
                    <Collapse>
                        <CollapseHeader style={{ height: 45 }} >
                            <Separator bordered style={{ backgroundColor: '#fff' }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 2 }}>
                                        <Text style={{ fontFamily: 'Heebo-Bold', color: '#000', fontSize: 14 }}> {this.props._header(marker[0].Start)}</Text>
                                    </View>
                                    <View style={{ flex: 3, justifyContent: 'center' }}>
                                        {marker.length > 1 ? <Text style={{ fontSize: 12, fontFamily: 'Heebo-Bold', color: '#000' }}>
                                            Visited <Text style={{ color: '#3498db', fontSize: 12 }}> {marker.length}</Text> times
          </Text> :
                                            <Text style={{ fontSize: 12, fontFamily: 'Heebo-Bold', color: '#000' }}>
                                                Visited <Text style={{ color: '#3498db', fontSize: 12 }}> {marker.length}</Text> time
          </Text>}

                                    </View>
                                </View>
                            </Separator>
                        </CollapseHeader>
                        <CollapseBody>
                            <View style={styles.timelineDetails}>
                                {marker ? marker.map((m, ii) => (
                                    <View key={ii} style={{ ...styles.timelineDetail }}>
                                        <View style={styles.stopTime}>
                                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                                {/* <Image style={{ width: 15, height: 15 }} source={require('../assets/img/stop_time.png')} /> */}
                                            </View>
                                            <View style={{ flex: 9 }}>
                                                <Text style={styles.headfontStyle}>{this.props._convertDate(m.Start)}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.difference}>
                                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                               
                                            </View>
                                            <View style={{ flex: 9, }}>
                                                <Text style={{ ...styles.headfontStyle, fontSize: 10 }}>{this.props._differnceHours(m.Start, m.End)}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.startTime}>
                                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                                
                                            </View>
                                            <View style={{ flex: 9, }}>
                                                <Text style={styles.headfontStyle}>{this.props._convertDate(m.End)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )) : null}
                            </View>
                        </CollapseBody>
                    </Collapse>
                )) : null}

            </CollapseBody>
        )
    }
}

const styles = StyleSheet.create({
    p10: {
        padding: 10,
    },
    text: {
        fontSize: 72,
        fontFamily: 'Heebo-Medium',
        fontWeight: 'bold',
        color: '#25ad61'
    },
    startTime: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    stopTime: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    difference: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 7,
        paddingVertical: 5,
        borderLeftWidth: 2,
        borderLeftColor: 'grey',
        paddingHorizontal: 5
    },
    headfontStyle: {
        fontSize: 12,
        letterSpacing: 1,
        lineHeight: 15,
        color: '#000',
    },
    timelineDetails: {
        marginVertical: 6,

    },
    timelineDetail: {
        flex: 0.12,
        paddingTop: 15,
        padding: 10,
        flexDirection: 'column',
        marginHorizontal: 5,
        marginBottom: 6,
        borderRadius: 10,
        paddingHorizontal: 30,
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.5)'
    }
})

export default MfpBody










{/* <CollapseBody style={{ backgroundColor: '#fff' }}>
{  this.props.state[0] ? this.props.state[0].map((marker, i) => (
<View style={styles.timelineDetails}>
{marker ? marker.map((m, ii) => (
<View key={ii} style={{ ...styles.timelineDetail }}>
<View style={styles.stopTime}>
<View style={{ flex: 1, justifyContent: 'center' }}>
<Image style={{ width: 15, height: 15 }} source={require('../assets/img/stop_time.png')} />
</View>
<View style={{ flex: 9 }}>
<Text style={styles.headfontStyle}>{this.props._convertDate(m.Start)}</Text>
</View>
</View>
<View style={styles.difference}>
<View style={{ flex: 1, justifyContent: 'center' }}>

</View>
<View style={{ flex: 9, }}>
<Text style={{ ...styles.headfontStyle, fontSize: 10 }}>{this.props._differnceHours(m.Start, m.End)}</Text>
</View>
</View>
<View style={styles.startTime}>
<View style={{ flex: 1, justifyContent: 'center' }}>
<Image style={{ width: 15, height: 15 }} source={require('../assets/img/start_time.png')} />
</View>
<View style={{ flex: 9, }}>
<Text style={styles.headfontStyle}>{this.props._convertDate(m.End)}</Text>
</View>
</View>
</View>
)) : null}
</View>
           )) : null}
         </CollapseBody>                     */}