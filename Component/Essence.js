import React, { memo } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Image } from 'react-native';





class Essence extends React.Component {
    
  constructor(props) {
    super(props)
  }
  
  _Image(){
    if(this.props.essence[this.props.nb-1]==1){
        return(<Image 
            source={require('../assets/noir.png')}
            style={styles.essence}
         />)
    }
    else if(this.props.essence[this.props.nb-1]==2){
        return(<Image 
            source={require('../assets/rouge.png')}
            style={styles.essence}
         />)
    }
    else{
        return(<Image 
            source={require('../assets/blanc.png')}
            style={styles.essence}
         />)
    }
}

  render() {
    return(
     <View style={styles.container}>
         {this._Image()}
     </View>
    )
    }
}


const styles = StyleSheet.create({

    essence : {
        width : 50,
        height : 70,
        marginLeft : 3,
        marginRight : 3
    }
  })

export default Essence
