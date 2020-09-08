import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, ActivityIndicator, Alert } from 'react-native';
import Background from './Background';
import Logo from './Logo';
import Button from './Button'
import navigation from '../navigation/navigation'
import axios from 'axios'
import { connect } from 'react-redux'
import { emailValidator, passwordValidator } from '../core/utils';
import userToken from '../Store/Reducers/routeReducer';
import Stockage from './saveToken'

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

class Connexion extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
          email : "",
          mdp : "",
          isLoading : false,
          userToken : ""
      }
      
       
    }
    

    _connexion  = (email, mdp) => {
        const req = {
            email,
            mdp
          };
          var emailError = emailValidator(email);
          var passwordError = passwordValidator(mdp);
        if (!(emailError || passwordError)) {
          
        this.setState({
              isLoading : true
          }, () =>{
        authAxios.post('http://winyourcar.fr/api/login?email='+this.state.email+'&password='+this.state.mdp, req).then(
        (res) => {
            this.setState({
                isLoading : false,
                userToken : res.data['token']
            }, () =>{
            const action = { type: "SAVETOKEN", value: this.state.userToken }
            this.props.dispatch(action)
            this.props.navigation.navigate('Route')
            Stockage.storeToken(res.data['token'])
            
        })
          _storeData(res.data["token"]).then((res) => {
            
            
            
          });
        },
        (err) => {
            // Works on both Android and iOS
            Alert.alert(
              'Connexion refusée',
              'Les identifiants saisis ne correspondent pas !',
              [
                { text: 'OK', onPress: () => console.log("erreur : " + err) },
              ],
              { cancelable: false }
            );
            this.setState({
                isLoading : false
            })
            this.setState({
                mdp : ""
            })
          })
        
    })
}
else{
    Alert.alert(
        'Identifiant invalides',
        emailError + " "+ passwordError,
        [
          { text: 'OK' },
        ],
        { cancelable: false }
        
      );
}
    }
    _displayLoading() {
        if (this.state.isLoading) {
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size='large' />
              {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
            </View>
          )
        }
      }
    render() {
        return(
<Background>
      <Logo />
            <TextInput style={styles.field} placeholder="E-Mail" value={this.state.email} 
            returnKeyType="next" 
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
             onChangeText={(text) => this.setState({email : text})}></TextInput>
            <TextInput style={styles.field} placeholder="Mot de passe" value={this.state.mdp} onChangeText={(text) => this.setState({mdp : text})} secureTextEntry></TextInput>
      <Button mode="contained" style={styles.valider} onPress={() => {this._connexion(this.state.email, this.state.mdp)}}>
        Valider
      </Button>
      <View style={styles.creerCompte}>
        <Text style={styles.label}> Nouveau ? </Text>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Inscription')}}>
          <Text style={styles.link}>Créez un compte !</Text>
        </TouchableOpacity>
      </View>
      {this._displayLoading()}
    </Background>
        )}
        
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
                  paddingLeft : 15
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
              userToken: state.userToken,
              userScore: 0
            }
          }
          

export default connect(mapStateToProps)(Connexion)