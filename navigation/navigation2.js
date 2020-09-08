import React from 'react'
import { createStackNavigator  } from "react-navigation-stack";
import { createAppContainer} from "react-navigation";
import {Image, StyleSheet} from 'react-native'
import { createBottomTabNavigator } from "react-navigation-tabs";
import Prizes from '../Component/Prizes'
import Game from '../Component/Game'
import Grille from '../Component/Grille'
import Deconnexion from '../Component/Deconnexion'
import Route from '../Component/Route'

const DeconnexionNavigator = createStackNavigator({
    Deconnexion: { screen: Deconnexion },
    Route: { screen: () => <Route /> }
},{ headerMode: 'none' })

const GameStackNavigator = createStackNavigator({
    Grille: { screen: Grille },
    Game: { screen: Game,
        navigationOptions: {  tabBarVisible: false }, },

},{ headerMode: 'none' })

const styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 40
      }
})

const MoviesTabNavigator = createBottomTabNavigator({
	
	Grille: {
        screen: GameStackNavigator,
        navigationOptions : {
            tabBarIcon: () => {
                return <Image 
                    source={require('../assets/jeu1.png')}
                    style={styles.icon}
                />
            }
            
        },
	},
	Prizes: {
      screen: Prizes,
      navigationOptions : {
        tabBarIcon: () => {
            return <Image 
                source={require('../assets/logo1.png')}
                style={styles.icon}
            />
        }
        
    },
    },
    Deconnexion: {
        screen: DeconnexionNavigator,
        navigationOptions : {
            tabBarIcon: () => {
                return <Image 
                    source={require('../assets/logout1.png')}
                    style={styles.icon}
                />
            }
            
        },
      },
},
{
    tabBarOptions: {
        activeBackgroundColor: '#333333', // Couleur d'arrière-plan de l'onglet sélectionné
        inactiveBackgroundColor: '#222222', // Couleur d'arrière-plan des onglets non sélectionnés
        showLabel: false, // On masque les titres
        showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
      }
    })

    

export default createAppContainer(MoviesTabNavigator)