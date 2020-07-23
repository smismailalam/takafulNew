import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity , ScrollView , ImageBackground} from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';
import Card from '../Card.js';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Animatable from 'react-native-animatable';
import AnimateNumber from '@bankify/react-native-animate-number'
var interval = null;
export default class PayAsYouDrive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onBack: true,
      trip:0,
      distance:0,
      rupees:0,
      tripFill:0,
      distanceFill:0,
      rupeesFill:0,
      payNow:false,
      invoice:[],
      totalDistance:0,
      invoicesLength:0,
      distancePer:0,
      distancePerYear:0,
      outstanding_amount:5000,
      vehicles: [],
      chassis_no:'',
      engine_no:'',
      assorted_code:'',
      ind:0,
      loading:false,
      total_os:0,
    };
  }

  calAvg(val, servenDaysVal) {
    var valueAvg = servenDaysVal / 7;
    var mul = val * 80;
    var total = mul / valueAvg;
    return total;
  }

  calAvgDistance(val) {
    if (val >= 60) {
      return 100;
    } else {
      return (val * 100) / 60;
    }
  }

  smallThan(billingDaysCount , oneDayDistance){
    var monthSmallerThanMax =  billingDaysCount * 60;
    var monthSmallerThanVal = ((billingDaysCount - 1) * 60) + oneDayDistance;
    return ((monthSmallerThanVal * 100 ) / monthSmallerThanMax);
  }

  greaterThan(billingDaysCount,oneDayDistance ){
    var monthGreaterThanMax =  ((billingDaysCount-1) * 60) + oneDayDistance;
    var twentyPer = ((monthGreaterThanMax / 100) * 20);
    monthGreaterThanMax = monthGreaterThanMax + twentyPer;
    var monthGreaterThanVal = ((billingDaysCount - 1) * 60) + oneDayDistance;
    return ((monthGreaterThanVal * 100 ) / monthGreaterThanMax);
  }

  fetchData(url) {    
    var currentDate = new Date();
    var billingDate = this.dateFormat(global.billing_start_dateM);
    var issueDate = this.dateFormat(global.issue_dateM);
    var billingDaysCount = this.datediff(this.parseDate(billingDate), currentDate);
    var issueDaysCount = this.datediff(this.parseDate(issueDate), currentDate);
    var pendingInvoice = `http://54.36.109.50:81/avoloxapi/api/Customer/GetPendingInvoiceJsonByCode?assorted_code=${this.state.assorted_code}`;
    try {
      axios
        .get(url)
        .then(response => {
          if (response.status === 200) {
            var distance = response.data.distance;
            var amount = response.data.amount;
            var yearAmount = response.data.yearAmount;
            var oneDayDistance = response.data.currentDayDistance;    

            var monthSmallerThanCal = this.smallThan(billingDaysCount , oneDayDistance);
            
            var monthGreaterThanCal = this.greaterThan(billingDaysCount , oneDayDistance);
            
            var distancePer = oneDayDistance > 60 ? monthGreaterThanCal : monthSmallerThanCal;
            
            distancePer = distancePer.toFixed(0);
            
            var yearSmallerThanCal = this.smallThan(issueDaysCount , oneDayDistance);
            
            var yearGreaterThanCal = this.greaterThan(issueDaysCount , oneDayDistance);
            
            var distancePerYear = oneDayDistance > 60 ? yearGreaterThanCal : yearSmallerThanCal;
            
            distancePerYear = distancePerYear.toFixed(0);

            axios
            .get(pendingInvoice)
            .then(response => {
              var total_os = response.data[0].total_os;
              this.setState({
                loading:false,
                yearAmount,
                distance,
                distancePer,
                distancePerYear,
                rupees: amount,
                total_os,
              });

            })
            .catch(error => {
              console.log('error' , error)
            });

            
          }
        })
        .catch(error => {
          console.log('error' , error)
        });
    } catch (error) {}
  }
  dateFormat(billingDate){
    billingDate = billingDate.split(' ');
    billingDate = billingDate[0];
    billingDate = billingDate.split('/');
    return billingDate[2] + '-' + billingDate[0] + '-' + billingDate[1];
  }
  componentDidMount() {
    var date = new Date();
    var dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var mm =
      date.getMonth() + 1 < 10
        ? '0' + parseInt(date.getMonth() + 1)
        : date.getMonth() + 1;
    var yyyy = date.getFullYear();
    date = yyyy + '-' + mm + '-' + dd;  


    if (global.billing_start_dateM) {
      var billingDate = this.dateFormat(global.billing_start_dateM);      
      var policyDate = this.dateFormat(global.issue_dateM);

      this.setState({
        chassis_no:global.chassis_no,
        engine_no:global.engine_no,
        assorted_code:global.assorted_code
      },()=>{
        var url = `${global.API_URL}/api/Salamti/GetDetails?chassis=${this.state.chassis_no}&engine=${this.state.engine_no}&policyDate=${policyDate}&billingDate=${billingDate}&sumCovered=${global.sum_covered}`;      
        this.setState({
          loading:true
        },()=>{
          this.fetchData(url);
        })
        this.IgnitionStatus();
        interval  = setInterval(() => {
          this.IgnitionStatus();
          this.fetchData(url);
        }, 10000);
      })
    }

    try {
      var invoiceUrl = `http://54.36.109.50:81/avoloxapi/api/Customer/GetPendingInvoiceJson?p_cnic=${
        global.cnci
      }`;
      axios
        .get(invoiceUrl)
        .then(response => {
          if (response.status === 200 && response.data.length > 0) {
            this.setState({
              invoice:response.data[0],
              invoicesLength:response.data.length,
            })
          }
        })
        .catch(error => {});
    } catch (error) {}
  }
  IgnitionStatus(){
    var GetIgnitionStatuses = `${global.API_URL}/api/Salamti/GetIgnitionStatuses?engines=${global.engineNos}&chassis=${global.chassisNos}`
    
    axios
    .get(GetIgnitionStatuses)
    .then(response => {
      if (response.status === 200) {
        var res = response.data;
        var vehicles_ = [];
        console.log('global.vehicles' , global.vehicles)
        for(var j = 0; j < (global.vehicles).length; j++){
          for(var i = 0; i < res.length; i++){
            if(res[i].Engine == global.vehicles[j].engine_no){
              var singleVehcile = global.vehicles[j];
              singleVehcile.ignition = res[i].IgnitionStatus;
              vehicles_.push(singleVehcile);
            }
          }
        }
        this.setState({
          vehicles:vehicles_,
        })
      }
    })
    .catch(error => {});
  }
  driveBtn(engine_no , chassis_no , assorted_code , ind ,){
    global.chassis_no = chassis_no;
    global.engine_no = engine_no;
    global.assorted_code = assorted_code;
    var billingDate = this.dateFormat(global.billing_start_dateM);      
    var policyDate = this.dateFormat(global.issue_dateM);
    this.setState({
      chassis_no:global.chassis_no,
      engine_no:global.engine_no,
      assorted_code: global.assorted_code,
      ind
    },()=>{
      var url = `${global.API_URL}/api/Salamti/GetDetails?chassis=${this.state.chassis_no}&engine=${this.state.engine_no}&policyDate=${policyDate}&billingDate=${billingDate}&sumCovered=${global.sum_covered}`;      
      clearInterval(interval);
      this.setState({
        loading:true
      },()=>{
        this.fetchData(url);
      })
      interval  = setInterval(() => {
        this.IgnitionStatus();
        this.fetchData(url);
      }, 10000);
    })
  }

  parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[0], mdy[1]-1, mdy[2]);
  }

  datediff(first, second) {
      // Take the difference between the dates and divide by milliseconds per day.
      // Round to nearest whole number to deal with DST.
      return Math.round((second-first)/(1000*60*60*24));
  }

  render() {
    var icon =
      this.state.distanceFill < 33
        ? require('../../../assets/icons/android/drawable-xxxhdpi/arrow-down_G.png')
        : this.state.distanceFill < 66
        ? require('../../../assets/icons/android/drawable-xxxhdpi/arrow-down_Y.png')
        : require('../../../assets/icons/android/drawable-xxxhdpi/arrow-down_1.png');

    return (
      <Animatable.View
        animation="fadeInUp"
        duration={1500}
        useNativeDriver={true}>
        <Card style={{...styles.main, ...this.props.style}}>
          <View style={{...styles.header}}>
            <View style={styles.titleLogoView}>
              <Image
                style={styles.titleLogo}
                source={require('../../../assets/icons/android/drawable-xxxhdpi/steering.png')}
              />
            </View>
            <View style={styles.headerTitle}>
              <Text style={{...styles.title}}>Pay As You Drive</Text>
            </View>
          </View>
          <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {
                this.state.vehicles.map((message, index) => {
                  return(
                    <ImageBackground key={index} style={{ width:120, height:33 }} source={this.state.ind == index ? require('../../../assets/icons/android/drawable-xxxhdpi/Rounded-Selected.png') : require('../../../assets/icons/android/drawable-xxxhdpi/Without-selected-.png')}>
                      <TouchableOpacity onPress={()=>{ this.driveBtn(message.engine_no , message.chassis_no , message.assorted_code , index) }} style={{ flex:1,flexDirection:'row' , justifyContent:'center' , paddingTop:5}}>
                        <Image
                          style={{ marginRight:5, width:18, height:18 }}
                          source={message.ignition == 1 ? require('../../../assets/icons/android/drawable-xxxhdpi/Grrrn.png') : require('../../../assets/icons/android/drawable-xxxhdpi/red-circle-.png')}
                        />
                        <Text style={{ fontSize:11, color:'#383838' }}>{message.engine_no}</Text>
                      </TouchableOpacity>                
                    </ImageBackground>
                  )
                })
              }            
            </ScrollView>
          </View>
          <View style={{ opacity:this.state.loading == true ? 0.2 : 1 }}>
            <View style={{ flex:1, flexDirection:'row', justifyContent:'center', marginTop:10 }}>
              <Text style={{ fontSize:12, fontFamily:'Ubuntu-Regular', marginTop:1 }}>Drive Month Till Date</Text>
              <Text style={{ color:'#1871b0', marginLeft:5, fontFamily: 'Ubuntu-Bold', }}>
                <AnimateNumber value={this.state.distance} formatter={(val) => {
                  return val ? val.toFixed(2) : 0
                }}/>
                km</Text>
            </View>

          {/* <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('PayAsYouDrive', {
                header: {
                  headerTitle: 'Old Invoices',
                },
              });
            }}> */}
            <View style={{ flex:1 , flexDirection:'row', marginTop:10, marginBottom:10 }}>
              <View style={{ flex:1 }}>
                <AnimatedCircularProgress duration={1500} rotation={0} size={80} width={7} fill={this.state.distancePer} tintColor="#3498DB" backgroundColor='#e5e5e5'>
                  {
                    (fill) => (
                      <View style={{ flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
                        <Text>RS.</Text>
                        <Text style={{ fontFamily:'Ubuntu-Bold' }}>
                        <AnimateNumber value={this.state.rupees} formatter={(val) => {
                          return val ? val.toFixed(0) : 0
                        }}/>
                        {/* {this.state.rupees ? this.state.rupees.toFixed(0) : 0 }*/}
                        </Text> 
                      </View>
                    )
                  }
                </AnimatedCircularProgress>
                <Text style={{ fontSize:12, fontFamily:'Ubuntu-Regular', color:'#383838' , marginTop:10 , textAlign:'center'}}>Premium Month Till Date</Text>
              </View>

              <View style={{ flex:1 }}>
                {/* <AnimatedCircularProgress duration={1500} rotation={0} size={80} width={7} fill={50} tintColor="#ff9000" backgroundColor='#e5e5e5'> */}
                <AnimatedCircularProgress duration={1500} rotation={0} size={80} width={7} fill={this.state.distancePerYear} tintColor="#ff9000" backgroundColor='#e5e5e5'>
                  {
                    (fill) => (
                      <View style={{ flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
                        <Text>RS.</Text>
                        <Text style={{ fontFamily:'Ubuntu-Bold' }}>
                          <AnimateNumber value={this.state.yearAmount} formatter={(val) => {
                            return val ? val.toFixed(0) : 0
                          }}/>
                          {/* {this.state.yearAmount ? this.state.yearAmount.toFixed(0) : 0 } */}
                          </Text>
                      </View>
                    )
                  }
                </AnimatedCircularProgress>
                <Text style={{ fontSize:12, fontFamily:'Ubuntu-Regular', color:'#383838' , marginTop:10 , textAlign:'center'}}>Premium Since Policy inception</Text>
              </View>
              
              <View style={{ flex:1 }}>
                <AnimatedCircularProgress duration={1500} rotation={0} size={80} width={7} fill={0} tintColor="#34b401" backgroundColor='#e5e5e5'>
                  {
                    (fill) => (
                      <View style={{ flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
                        <Text>RS.</Text>
                        <Text style={{ fontFamily:'Ubuntu-Bold' }}> <AnimateNumber value={this.state.total_os} formatter={(val) => {
                            return val && val > 0 ? val.toFixed(0) : 0
                          }}/></Text>
                      </View>
                    )
                  }
                </AnimatedCircularProgress>
                <Text style={{ fontSize:12, fontFamily:'Ubuntu-Regular', color:'#383838' , marginTop:10 , textAlign:'center'}}>Premium Outstanding</Text>
              </View>

            </View>
            {/* </TouchableOpacity> */}
            <View
              style={{
                marginTop: 10,
                flex: 1,
                flexDirection: 'row',
                marginHorizontal: 15,
              }}>
              <TouchableOpacity
                rippleContainerBorderRadius={10}
                style={[ styles.paybtn, styles.selectedBtn]}>
                <Text
                  style={{...styles.detailsText , color:'#1871b0'}}>
                  Pay Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {
            this.state.loading == true ? 
            <Text style={{ position:'absolute', top:'50%', left:'35%' , fontWeight:'bold', fontSize:14 }}>Loading Please Wait... </Text> : null
          }

        </Card>
        <Modal
        animationIn="fadeIn"
        animationInTiming={400}
        animationOut="fadeOut"
        animationOutTiming={400}
        isVisible={this.state.payNow}>
        <View style={{flex:0.3, backgroundColor:'#fff'}}>
          
          <View style={{ flex:2 , alignItems:'center', marginBottom:10 , backgroundColor:'#0e74bc', borderBottomWidth:1, borderBottomColor:'#ddd' }}>
            <Text style={{ fontSize:20, padding:5, color:'#fff' }}>Invoice Bill</Text>
          </View>
          
          <View style={{ flex:6, paddingHorizontal:10 }}>
            <View style={styles.inVoiceSection}>
              <View style={{ flex:1 }}>
                <Text style={styles.inVoiceLabel}>Assorted code</Text>
              </View>
              <View style={{ flex:2 }}>
                <Text style={styles.inVoiceText}>{this.state.invoice.assorted_code}</Text>
              </View>
            </View>
            
            <View style={styles.inVoiceSection}>
              <View style={{ flex:1 }}>
                <Text style={styles.inVoiceLabel}>Policy#</Text>
              </View>
              <View style={{ flex:2 }}>
                <Text style={styles.inVoiceText}>{this.state.invoice.policy_no}</Text>
              </View>
            </View>
            
            <View style={styles.inVoiceSection}>
              <View style={{ flex:1 }}>
                <Text style={styles.inVoiceLabel}>Invoice amount</Text>
              </View>
              <View style={{ flex:2 , flexDirection:'row' }}>
                <View style={{ flex:2 }}>
                  <Text style={styles.inVoiceNumericText}>{this.state.invoice.invoice_amount}</Text>
                </View>
                <View style={{ flex:6 }}></View>
              </View>
            </View>
            
            <View style={styles.inVoiceSection}>
              <View style={{ flex:1 }}>
                <Text style={styles.inVoiceLabel}>Paid amount</Text>
              </View>
              <View style={{ flex:2 , flexDirection:'row' }}>
                <View style={{ flex:2 }}>
                  <Text style={styles.inVoiceNumericText}>{this.state.invoice.paid_amount}</Text>
                </View>
                <View style={{ flex:6 }}></View>
              </View>
            </View>              
            
            <View style={styles.inVoiceSection}>
              <View style={{ flex:1 }}>
                <Text style={styles.inVoiceLabel}>Outstanding amount</Text>
              </View>
              <View style={{ flex:2 , flexDirection:'row' , borderTopWidth:1, paddingTop:5 }}>
                <View style={{ flex:2 }}>
                  <Text style={styles.inVoiceNumericText}>{this.state.invoice.outstanding_amount}</Text>
                </View>
                <View style={{ flex:6 }}></View>
              </View>            
            </View>
            {/* <ScrollView>
                          
            </ScrollView> */}
          </View>

          <View style={{ flex:2, flexDirection:'row' , paddingHorizontal:10 , marginBottom:10 }}>
            <TouchableOpacity
              rippleContainerBorderRadius={10}
              onPress={() =>  this.setState({ payNow:true }) }
              style={{flex:1, borderBottomLeftRadius:20,borderTopLeftRadius:20, backgroundColor: '#0e74bc', elevation: 1, borderRightWidth:1, borderRightColor:'#fff', justifyContent: 'center',}}>
              <Text
                style={{...styles.detailsText , color:'#fff'}}>
                Pay Now
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              rippleContainerBorderRadius={10}
              onPress={() =>  this.setState({ payNow:false }) }
              style={{flex:1, borderBottomRightRadius:20,borderTopRightRadius:20, backgroundColor: '#0e74bc', elevation: 1, borderColor: '#0e74bc', justifyContent: 'center',}}>
              <Text
                style={{...styles.detailsText , color:'#fff'}}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
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
    fontSize: 9,
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
  colorHeadingTxt: {
    color: '#000000',
    fontFamily: 'Ubuntu-Medium',
  },
  title: {
    color: '#383838',
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
  },
  main: {
    flexDirection: 'column',
    width: '100%',
    flex: 0.4,
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
    marginBottom:15
  },
  titleLogoView: {
    // flex: 1,
  },
  titleLogo: {
    width: 18,
    height: 18,
  },
  headerTitle: {
    marginLeft:10
    // flex: 8,
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
    // flex: 1,
    // fontSize: 15,
    // lineHeight: 22,
    // letterSpacing: 0.16,
    textAlign: 'center',
    // color: '#0E74BC',
    fontSize: 12 , 
    padding:10,
    textTransform:'uppercase'
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
  paybtn: {
    borderRadius:20,
    // borderTopLeftRadius:20,
    // borderBottomLeftRadius:20,
    borderRightWidth:1,
    borderRightColor:'#fff',
    marginHorizontal:60
  },
  invoiceBtn:{
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
  },
  selectedBtn : {
    flex:1,    
    backgroundColor: '#fff',
    elevation: 1,
    borderColor: '#fff',
    elevation:3,
    justifyContent: 'center',
  },
  disabledBtn : {
    flex:1,    
    backgroundColor: '#fff',
    elevation: 1,
    borderColor: '#0e74bc',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
  }
});
