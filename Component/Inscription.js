import React, { memo } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Alert, ActivityIndicator, Linking } from 'react-native';
import Background from './Background';
import Logo from './Logo';
import Button from './Button'
import axios from 'axios'
import { connect } from 'react-redux'
import Stockage from './saveToken'
import {
    emailValidator, passwordValidator, nameValidator, confValidator} from '../core/utils';


    const authAxios = axios.create({
        baseURL: 'https://www.winyourcar.fr/api',
        headers: {
          Accept: 'application/json',
          API_KEY: 'a2dc14c5-7198-4f41-8c03-0041f07a882a',
        },
      })
      const _storeData = async (token) => {
        try {
          await AsyncStorage.setItem(
            'token',
            token
          );
        } catch (error) {
          // Error saving data
        }
      };
class Inscription extends React.Component {
    
  constructor(props) {
    super(props)
    this.state = {
        email : "",
        mdp : "",
        confMdp : "",
        nom : "",
        isLoading : false,
        userToken : ""
    }
    
    
     
  }
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }
  _inscription = () =>{
    this.setState({
        isLoading : true
    })
    var emailError = emailValidator(this.state.email);
    var passwordError = passwordValidator(this.state.mdp);
    var nameError = nameValidator(this.state.nom)
    var confError = confValidator(this.state.mdp, this.state.confMdp)
    if(emailError || passwordError || nameError || confError){
        Alert.alert('Formulaire invalide', nameError+ " " +emailError+ " " + passwordError+ " "+ confError, );
        this.setState({
            isLoading : false
        })
    }
    else{
        var birthday = '1990-01-01'
        var gender  = 'human'


        const param = {
            "name": this.state.nom,
            "email": this.state.email,
            "password" : this.state.mdp,
            "password_confirmation" : this.state.confMdp,
            "gender": "human",
            "birthday": "1990-01-09",
        }
        authAxios.post('http://winyourcar.fr/api/register', param).then(
        (res) => {
          _storeData(res.data["token"]);
          this.setState({
            isLoading : false,
            userToken : res.data['token']
        }, () =>{
        const action = { type: "SAVETOKEN", value: this.state.userToken }
        this.props.dispatch(action)
        Stockage.storeToken(res.data['token'])
        this.props.navigation.navigate('Route')
    })
          alert('Votre compte a bien été crée')
        },
        (err) => {
          Alert.alert('Incorrect Email or password!');
          console.log(err);
          this.setState({
              mdp : "",
              confMdp : ""
          })
          this.setState({
            isLoading : false
        })
        }
      );
      
    }

    
  }

  render() {
    return (
        <Background>

      <Logo />
        <Text style={styles.titre}> Inscrivez-vous !</Text>
            <TextInput style={styles.field} placeholder="Nom" value={this.state.nom} onChangeText={(text) => {this.setState({nom:text})}}></TextInput>
            <TextInput style={styles.field}  value={this.state.email} onChangeText={(text) => {this.setState({email:text})}}
                placeholder="E-Mail" 
                autoCapitalize="none"
                autoCompleteType="email"    
                textContentType="emailAddress"
                keyboardType="email-address"></TextInput>
            <TextInput style={styles.field} placeholder="Mot de passe"  value={this.state.mdp} onChangeText={(text) => {this.setState({mdp:text})}}
             secureTextEntry></TextInput>
            <TextInput style={styles.field} placeholder="Confirmez votre mot de passe" value={this.state.confMdp} onChangeText={(text) => {this.setState({confMdp:text})}}
             secureTextEntry></TextInput>
      
      <Button mode="contained" style={styles.valider} onPress={() => {this._inscription()}}>
        Valider
      </Button>
<Text> En cliquant sur valider, j'accepte les <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://google.fr')}>Conditions générales d'utilisations</Text>.</Text>
      {this._displayLoading()}
    </Background>
    )
    }
}

const styles = StyleSheet.create({
    creerCompte: {
        flexDirection: 'row',
        marginTop: 4,
    },
    valider : {
        backgroundColor : 'black',
        borderRadius : 6,
        marginTop : 10,
    },
    titre:{
       fontSize : 25,
       fontWeight : '600',
       marginBottom : 25 
    },
    label: {
        color: 'black',
      },
      link: {
        fontWeight: 'bold',
        color: 'rgb(5,126, 216)',
      },
      field:{
          height : 40,
          marginTop : 5,
          width :  Dimensions.get('window').width/1.4,
          borderWidth : 1,
          borderColor : 'black',
          borderRadius : 7,
          paddingLeft : 15,
          marginBottom : 10
      },
      loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
  })

  const mapStateToProps = (state) => {
    return {
      userToken: state
    }
  }
  
export default connect(mapStateToProps)(Inscription)
