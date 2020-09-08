import React, { memo } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Image } from 'react-native';
import Background from './PrizesBackground'
import axios from 'axios'
import { Buffer } from "buffer";

class Prize extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          image : ""
        }
      }

      componentDidMount(){
        const Axios = axios.create({
            baseURL: 'https://www.winyourcar.fr/api',
            headers: {
              Accept: 'application/json',
              API_KEY: 'a2dc14c5-7198-4f41-8c03-0041f07a882a',
            },
          })
          Axios.get('http://winyourcar.fr/api/prizes/'+this.props.prize.item.id+'/image', {responseType: 'arraybuffer'}).then(
                          (res2) => {
                            const image64 = Buffer.from(res2.data, 'binary').toString('base64');
                            this.setState({
                              image : image64,
                            })
                            },
                          (err2) =>{
                            console.log(err2)
                          });
      }


      render() {
        return(
            <View style={styles.container}>
         <Background>
             <Text style={styles.name}> {this.props.prize.item.name}</Text>
             <Text style={styles.type}> {this.props.prize.item.type} </Text>
             <Image
                style={styles.image}
                source={{uri: 'data:image/png;base64,' + this.state.image}} />
             <Text style={styles.price}> {this.props.prize.item.price} € </Text>
         </Background>
         </View>
        )
        }

}


const styles = StyleSheet.create({
  container:{
      width : Dimensions.get('window').width,
      height : Dimensions.get('window').height
  },
  name : {
      position : 'absolute',
      color: 'white',
      bottom : Dimensions.get('window').height/1.22,
      right : Dimensions.get('window').width /1.5,
      fontSize : 20,
      fontWeight : '700'
  },
  type:{
      position : 'absolute',
      color : 'white',
      bottom : Dimensions.get('window').height/1.39,
      fontSize : 20,
      fontWeight : '700',
      right : 50,
  },
  price:{
        position : 'absolute',
        fontSize  : 45,
        fontWeight : '600',
        bottom : 50
  },
  image:{
      width : Dimensions.get('window').width/1.3,
      height : 150
  }
})

export default Prize
