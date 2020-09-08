import React, { memo } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';





class Grille extends React.Component {
    
  constructor(props) {
    super(props)
  }
  
  _score(){
      if(typeof(this.props.score) !== "undefined"){
      if(this.props.indice <= this.props.score.length){
          if(this.props.score[this.props.indice-1] != null){
          return (<Text style={styles.score}>
             {this.props.score[this.props.indice-1]}  pts
             </Text>
          )
          }
      }
      else{
        return (<Text style={styles.score}>
          
            </Text>)
    }
    }
  }
  
  
  _unlockLevel(){
    if(typeof(this.props.score) !== "undefined"){      
          this.props.score[this.props.indice]
          if(this.props.indice <= this.props.score.length){
            return (
                <TouchableOpacity style={styles.container} onPress={() => this.props.goGame(this.props.indice)}>
         <Text style={styles.indice}>{this.props.indice}</Text>
     </TouchableOpacity>
            )
        } 
        else{
            return(
                <TouchableOpacity style={styles.container} onPress={() => this.props.unlockNiveau(this.props.indice)}>
         <Text style={styles.indiceLock}>{this.props.indice}</Text>
     </TouchableOpacity>
            )
        
      }
    }
}
  render() {
    return(
    <View>
     
     {this._unlockLevel()}
      {this._score()}
     </View>
    )
    }
}

const styles = StyleSheet.create({
   container:{
       backgroundColor : 'black',
       width : Dimensions.get('window').width/4,
       height : Dimensions.get('window').width/4,
       borderRadius : 20,
       justifyContent : "center",
       alignItems : "center"
   },
   indice : {
       color : 'rgb(255,212,2)',
       fontSize : 60,
       fontWeight : '600'
   },
   indiceLock : {
    color : 'rgb(92,76,0)',
    fontSize : 60,
    fontWeight : '600'
},
   score:{
       fontSize : 15,
       textAlign : 'center'
   }
  })

export default Grille
