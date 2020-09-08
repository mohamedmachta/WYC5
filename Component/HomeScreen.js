import React, { memo } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Background from './Background';
import Logo from './Logo';
import Button from './Button'
import navigation from '../navigation/navigation'





class HomeScreen extends React.Component {
    
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
        <Background>
            <Logo />
           <Text style={styles.titre}>L'application qui te fait gagner une voiture par semaine !</Text>
           <Button mode="contained" style={styles.connexion} onPress={() => this.props.navigation.navigate('Connexion')}>
              Connexion
            </Button>
            <Button mode="contained" style={styles.connexion} onPress={() => this.props.navigation.navigate('Inscription')}>
              Inscription
            </Button>
        </Background>
    )
    }
}

const styles = StyleSheet.create({
    titre: {
      textAlign : "center",
      fontSize : 18,
      marginBottom : 50,
      marginTop : 50
    },
    connexion : {
        backgroundColor : 'black',
        borderRadius : 6,
        marginTop : 10,
        
    }
  })

export default HomeScreen
