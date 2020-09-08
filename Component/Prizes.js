import React, { memo } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, FlatList } from 'react-native';
import Background from './Background'
import axios from 'axios'
import Prize from './Prize'



class Prizes extends React.Component {
    
  constructor(props) {
    super(props)
    this.state = {
      arrayPrizes : "",
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
    Axios.get('http://winyourcar.fr/api/prizes').then(
                    (res2) => {
                      this.setState({
                        arrayPrizes : res2.data
                      })
                      },
                    (err2) =>{
                      console.log(err2)
                    });

  }

  render() {
    return(
     <View style={styles.container}>
       <FlatList
			data={this.state.arrayPrizes}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({item}) => <Prize prize={{item}} />}
      />
      
     </View>
    )
    }
}

const styles = StyleSheet.create({
    container : {
      backgroundColor : 'rgb(255,212,2)'
    }
  })

export default Prizes
