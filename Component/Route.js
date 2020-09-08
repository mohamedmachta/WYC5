import React, { memo } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Background from './Background';
import Logo from './Logo';
import Button from './Button'
import Grille from './Grille'
import { connect } from 'react-redux'
import HomeScreen from './HomeScreen'
import UserConnected from './UserConnected'
import Stockage from './saveToken'
import navigation from '../navigation/navigation'
import navigation2 from '../navigation/navigation2'

import {AsyncStorage} from 'react-native'

class Route extends React.Component {
    
  constructor(props) {
    super(props)
    this.state = {
        userToken : this.props.userToken.token,
        userStorage : ""
    }
  }

  componentDidMount(){
    this.getTokenStorage()
  }
  componentDidUpdate(){
    this.getTokenStorage()
  }

  _initialisation(){
    
      if(this.state.userStorage == ""){
        return(
       <HomeScreen navigation={this.props.navigation}/>
        )
      }
      else{
        const action = { type: "SAVETOKEN", value: this.state.userStorage }
            this.props.dispatch(action)
        return(
          
                <UserConnected />
        )
      }
  }

  getTokenStorage = async()=>{
    let userData = await AsyncStorage.getItem('userData');
    let data = JSON.parse(userData);
    this.setState({
      userStorage : data
    }, () => {
    return data;
  })
  }

  render() {
    return (
      <View style={styles.container}>
          {this._initialisation()}

      </View>
    )
  }
}

const styles = StyleSheet.create({
    container :{
        flex : 1
    }
  })


  const mapStateToProps = (state) => {
    return {
      userToken: state.userToken
    }
  }
  

export default connect(mapStateToProps)(Route)