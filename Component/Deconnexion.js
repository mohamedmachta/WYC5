import React, { memo } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Image, TouchableOpacity, Linking } from 'react-native';
import Background from './Background'
import navigation from '../navigation/navigation2'
import Storage from './saveToken'

class Deconnexion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          image : ""
        }
      }

      componentDidMount(){
        
      }
      disconnect(){
          Storage.storeToken("")
          this.props.navigation.navigate('Router')
      }

      render() {
        return(
        <Background>
                   
                        <Text style={styles.paragraphe}>Bienvenue au sein de la communauté WinYourCar. 
                            Tentez et rententez votre chance afin de gagner la voiture de la semaine. Un seul gagnant par semaine à travers toute la communauté.
                            Ainsi, pour tenter votre chance, vous devez obtenir un score dans chaque niveau et permettre à votre score final de s'afficher.
                            Le joueur de la semaine possédant le score final le plus elevé se verra contacté par mail afin de prendre possession de son nouveau véhicule.
                            </Text>
                    <TouchableOpacity onPress={() =>this.disconnect()}>
                        <Image 
                        style={styles.deconnexion}
                        source={require( '../assets/logout2.png')}
                             />
                   </TouchableOpacity>
        </Background>
        )
        }

}


const styles = StyleSheet.create({
    container:{
        width : Dimensions.get('window').width,
        height : Dimensions.get('window').height
    },
    deconnexion : {
        fontSize : 20,
        fontWeight : '600',
        color: 'rgb(5,126, 216)',
        textAlign : "center",
        width : 80,
        height : 80,
        marginTop : 15
    },
    paragraphe:{
        textAlign : "justify",
        lineHeight : 30
    }
    })

export default Deconnexion
