import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CollapseHeader} from "accordion-collapse-react-native";


import { Separator } from 'native-base';

var length = 0

 class MfpHeader extends Component {
   constructor(props) {
     super(props)
     this._getCount = this._getCount.bind(this)
     this.state = {
       headerLength: 0
     }
   }
  //  componentDidMount() {
    // var totalCount = this.props.state.map((item) => this
  //  }

  _getCount(param) {
   
    var total = 0;
    for(var i = 0; i < param.length; i++){
      total += param[i].length
    }
    return total
  }

   render() {
    return (
      this.props.state.length != 0 ? this.props.state.map(item => this._getCount(item)) != 0 ? 
        <CollapseHeader style={{ height: 45 }} >
         <Separator bordered style={{ backgroundColor: '#fff' }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>

            {/* {this.props.state.length !== 0 ? console.log(this.props.state.map(item => this._getCount(item))) : null} */}

                  <Text style={{ fontSize: 12, fontFamily: 'Heebo-Bold', color: '#000', fontWeight: "bold" }}>
                  Visited <Text style={{ color: '#3498db', fontSize: 12, fontWeight: "bold" }}> 
                  {this.props.state.map(item => this._getCount(item))} </Text> 
                  { this.props.state.length != 0 ? this.props.state.map(item => this._getCount(item)) != 1 ?  'times ' : 'time ': null}on{' ' + this.props.day} in 4 weeks
                          </Text>
            </View>
          </View>
        </Separator>
      </CollapseHeader> : null : null

      
    )
  }
}

export default MfpHeader




{/* <CollapseHeader style={{ height: 45 }} >
<Separator bordered style={{ backgroundColor: '#fff' }}>
 <View style={{ flex: 1, flexDirection: 'row' }}>
   <View style={{ flex: 1, justifyContent: 'center' }}>
         <Text style={{ fontSize: 12, fontFamily: 'Heebo-Bold', color: '#000', fontWeight: "bold" }}>
         Visited <Text style={{ color: '#3498db', fontSize: 12, fontWeight: "bold" }}>
         {this.props.state.map(item => this._getCount(item))} </Text> 
        times on {this.props.day} in past 4 weeks
                 </Text>
   </View>
 </View>
</Separator>
</CollapseHeader> */}