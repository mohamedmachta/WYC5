import React, { memo } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Image, TouchableOpacity } from 'react-native';





class BouttonAdmob extends React.Component {
    
  constructor(props) {
    super(props)
  }
  

  _boutton(){
        if(this.props.essence[0] === 3){
            return (
                <TouchableOpacity onPress={() => {}} style={styles.bouton}>
                <Image 
          style={styles.icone}
          source = {require( '../assets/bouton.png')}
         />
         <Text>ok</Text>
         </TouchableOpacity>
            )
        }
        else{
            return (
                <TouchableOpacity onPress={() => {}} style={styles.bouton}>
            <Image 
                style={styles.icone}
                source = {require( '../assets/bouton-.png')}
               />
               </TouchableOpacity>
               )
        }
  }
  render() {
    return(
     <View style={styles.container}>
         {this._boutton()}
     </View>
    )
    }
}


const styles = StyleSheet.create({

    icone:{
        width : 70,
        height : 70,
      },
      bouton:{
          
        zIndex : 2
      }
  })

export default BouttonAdmob
