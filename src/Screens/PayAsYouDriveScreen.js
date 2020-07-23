import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, PixelRatio, StatusBar, BackHandler, FlatList , TouchableOpacity } from 'react-native'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { Thumbnail , Separator } from 'native-base';
import { BarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import * as scale from 'd3-scale'
import axios from 'axios';

export default class PayAsYouDriveScreen extends Component {
// export default class PayAsYouDriveScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      onBack: true,
      list:[],
      listKey:[],
    }}

    calAvg(val , servenDaysVal){
      var valueAvg = servenDaysVal / 4;
      return (val * 80) / valueAvg; 
    }
    componentDidMount(){
      
      var url = `${global.API_URL}/api/Salamti/Get28Days?chassis=NFBGM1647JR233934&date=2020-06-15`;
      try {
        axios
          .get(url)
          .then(response => {
            if (response.status === 200)
            {
              console.log(response.data);
              this.setState({
                list:response.data,
                listKey:Object.keys(response.data)
              })
            }
          })
          .catch(error => {
          });
      } 
      catch (error) {        
      }

      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.navigation.navigate('User');
        return true;
      });
      
    }
    componentWillUnmount() {
      this.backHandler.remove();
    }
    dateFormat(date){
      console.log(date);
      var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      if(date){
        var splitDateTime = date.split("T");
        var splitDate = splitDateTime[0].split("-");
        var monthIndex = splitDate[1];
        var month = mS[monthIndex - 1];
        return splitDate[2] + ' ' + month;
      }
      else{
        return date;
      }
    }
  render() {
    const data = [ 
      {
        value: 85,
        label: 'One',
        svg: {
            fill: 'green',
        },
      },
      {
        value: 35,
        label: 'two',
        svg: {
            fill: 'red',
        },
      },
      {
        value: 55,
        label: 'three',
        svg: {
            fill: 'blue',
        },
      },
    ];
    const CUT_OFF = 40
        const Labels = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <Text
                    key={ index }
                    x={ x(index) + (bandwidth / 2) }
                    y={ value.value < CUT_OFF ? y(value.value) - 10 : y(value.value) + 15 }
                    fontSize={ 14 }
                    fill={ value.value >= CUT_OFF ? 'white' : 'black' }
                    alignmentBaseline={ 'middle' }
                    textAnchor={ 'middle' }
                >
                    {value.value}
                </Text>
            ))
        )
    const axesSvg = { fontSize: 10, fill: 'black' };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 10
    console.log('list' , this.state.listKey)
    return (
      <View style={{ marginHorizontal:15 , marginTop:10}}>
        <View style={{ padding:15, backgroundColor:'#fbfbfb', borderTopRightRadius:15, borderTopLeftRadius:15 }}>
          <Text style={{ fontSize:14, fontFamily:'Ubuntu-Medium', textAlign:'center' }}>Pay As you Drive</Text>                    
          <Text style={{ fontSize:14, fontFamily:'Ubuntu-Medium', textAlign:'center' }}>Brings You Amazing Volume of Money</Text>                    
        </View>
        <View style = {{ height: 200}}>
          <View style = {{ flex: 1, backgroundColor:'#fff',  padding:15, height:200, borderBottomRightRadius:15, borderBottomLeftRadius:15 }}>
            {/* <YAxis
              data={data}
              yAccessor={({ index }) => index}
              scale={scale.scaleBand}
              contentInset={{ top: 10, bottom: 10 }}
              spacing={0.2}
              formatLabel={(_, index) => data[ index ].label}
            /> */}
            <BarChart
              style = {{ flex: 1 }}
              data = { data }
              svg = {{ fill: 'rgb(134, 65, 244)' }}
              contentInset = {{ top: 20, bottom: 20 }}
              yAccessor={({ item }) => item.value}
            >
              <Grid direction={Grid.Direction.HORIZONTAL}/>
              {/* <Labels/> */}
            </BarChart>
            {/* <XAxis
              style={{ marginTop: 10 }}
              data={ data }
              scale={scale.scaleBand}
              formatLabel={ (value, index) => index }
              labelStyle={ { color: 'black' } }
            /> */}
          </View>
        </View>
        <View style={{ alignItems:'center' , marginTop:10, backgroundColor:'#fff', borderRadius:15, padding:10}}>
            <View>
              <Text style={{ color:'#383838', fontSize:28, fontFamily:'Ubuntu-Medium' }}>Congratulation</Text>
            </View>
            <View style={{ flexDirection:'row' }}>
              <Text style={{ color:'#767676', fontSize:14, fontFamily:'Ubuntu-Regular' }}>You have so far saved </Text>
              <Text style={{ color:'#fe8f00', fontSize:14, fontFamily:'Ubuntu-Medim' }}>Rs,19,948</Text>
            </View>
        </View>
        
      </View>
    //   <View style={{ height: 200, padding: 20, backgroundColor:'#fff' }}>
        // <YAxis
        //   data={data}
        //   style={{ marginBottom: xAxisHeight }}
        //   contentInset={verticalContentInset}
        //   svg={axesSvg}
        // />
    //     <BarChart
    //         style={{ flex: 1 }}
    //         data={data}
    //         // gridMin={0}
    //         svg={{ fill: 'rgb(134, 65, 244)' }}
    //         yAccessor={({ item }) => item.value}
    //         contentInset={{ top: 20, bottom: 20 }}
    //     />
    //     <Grid/>
        // <XAxis
        //     style={{ marginTop: 10 }}
        //     data={ data }
        //     scale={scale.scaleBand}
        //     formatLabel={ (value, index) => index }
        //     labelStyle={ { color: 'black' } }
        // />
    // </View>
    //  <View style={{ flex:0.8, marginHorizontal:10 , marginTop:10 }}>

    //      <View>
    //     {this.state.listKey ? this.state.listKey.map((marker, i) => (
    //         <Collapse key={i}>
    //           <CollapseHeader style={{ height:45,borderBottomWidth:1 }}>
    //             <Separator style={{ backgroundColor: '#fff' }}>
    //               <View style={{ flex: 1, flexDirection: 'row' }}>
    //                 <View style={{ flex: 1, justifyContent: 'center' }}>
    //                   <Text style={{ fontSize: 12, fontFamily: 'Heebo-Bold', color: '#000', fontWeight: "bold" }}>
    //                   Total distance covered  on{ ' '+ marker } is  <Text style={{ color: '#3498db', fontSize: 12, fontWeight: "bold" }}> 
    //                   { this.state.list[marker].totalDistance.toFixed(2) }km </Text> in 4 weeks
    //                           </Text>
    //                 </View>
    //               </View>
    //             </Separator>
    //           </CollapseHeader>
    //           <CollapseBody>
    //             {
    //               this.state.list[marker].days ? this.state.list[marker].days.map((item , i ) => (
    //                 <Collapse key={i} style={{ borderBottomWidth:1, borderBottomColor:'#000' }}>
    //                   <CollapseHeader style={{ height:30 }}>
    //                     <View key={i} style={{ flex: 1, flexDirection: 'row' , backgroundColor:'#fff' }}>
    //                       <View style={{ flex:1 , justifyContent:'center' , alignItems:'center' }}>
    //                         <Text style={{ color: '#3498db', fontSize: 12 }}> { this.dateFormat(item.date ? item.date : item.dateKey )}</Text>
    //                       </View>
    //                       <View style={{ flex:1, justifyContent:'center' , alignItems:'center' }}>
    //                         <Text style={{ fontSize: 12, fontFamily: 'Heebo-Bold', color: '#000' }}><Text style={{ color: '#3498db', fontSize: 12 }}> {item.distance.toFixed(2)}km</Text></Text>
    //                       </View>
    //                       <View style={{ flex:1, justifyContent:'center' , alignItems:'center' }}>
    //                         <Text style={{ fontSize: 12, fontFamily: 'Heebo-Bold', color: '#000' }}> <Text style={{ color: '#3498db', fontSize: 12 }}> {item.trip} </Text> Trips</Text>                          
    //                       </View>
    //                     </View>                    
    //                   </CollapseHeader>
    //                 </Collapse>
    //               )) : null}
    //             <View>

    //             </View>
    //           </CollapseBody>
    //         </Collapse>
    //     )) : null}
    //     </View> 
    //     <StatusBar backgroundColor="#000000" opaque/>
    //   </View>
    )
  }
}

const styles = StyleSheet.create({
  colorHeadingTxt: {
    color: '#000000',
    fontFamily: 'Ubuntu-Medium',
  },
  title: {
    color: '#0E74BC',
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'Ubuntu-Medium',
  },
  // 606060
  unitText: {
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    marginBottom: 12,
    color: '#b0b0b1',
  },
  CircularProgressHeading: {
    fontSize: 14,
    // fontWeight:"bold"
  },
  main: {
    flexDirection: 'column',
    width: '100%',
    flex: 0.4,
    // marginTop: 10,
    // marginTop: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
    elevation: 1,
  },
  drivingDetail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  details: {
    fontSize: 20,
    fontWeight: '700',
  },
  // HEADER
  header: {
    flex: 1,
    flexDirection: 'row',
    // marginBottom: 10
  },
  titleLogoView: {
    flex: 1,
  },
  titleLogo: {
    width: 25,
    height: 25,
  },
  headerTitle: {
    flex: 8,
    // alignItems: 'center'
  },
  graphDetail: {
    flex: 3,
  },

  // CARD DETAILS
  cardDetails: {
    // borderWidth: 1, borderColor: '#000000',
    flex: 6,
    flexDirection: 'row',
    // marginVertical: 10
  },
  dailyWalkingDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailsText: {
    fontFamily: 'Ubuntu-Bold',
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0.16,
    textAlign: 'center',
    color: '#0E74BC',
  },
  graphView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width: 48,
    // height: 48
  },
  barChart: {
    flex: 1,
  },
});
