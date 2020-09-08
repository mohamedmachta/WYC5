import React, { memo, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Alert } from 'react-native';
import Background from './Background';
import Case from './Case'
import Logo from './Logo';
import Button from './Button'
import { connect } from 'react-redux'
import {getScores} from '../API/WycApi'
import axios from 'axios'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  TouchableHighlight,
} from 'expo-ads-admob';
import userToken from '../Store/Reducers/routeReducer';
import Stockage from './saveToken'




 
  
  

class Grille extends React.Component {
    
  constructor(props) {
    super(props)
    this.state={
      userToken : this.props.userToken,
      scoreTab : this.props.userScore,
      scorefinal : "...",
      boolUpdate : false
    }
  }

  

  async launchAd(indice){
      AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/1712485313')
      await AdMobRewarded.requestAdAsync()
      if(await AdMobRewarded.getIsReadyAsync()){
        await AdMobRewarded.showAdAsync()
        let param =   { "level" : indice+""}
        await axios.create({
          baseURL: 'https://www.winyourcar.fr/api',
          headers: {
            Accept: 'application/json',
            Authorization : 'Bearer '+ this.state.userToken
          },
        }).post('http://winyourcar.fr/api/unlockLevel', param).then(
          (res) => {
              let tamp = this.state.userScore;
              tamp[indice-1] = null;
              const action = { type: "SETSCORE", value: tamp }
             this.props.dispatch(action)
             this.setState({
               userScore : tamp
             })
             this.render();
          },
          (err) => {
            
          }
        )
      }
      else{
        Alert.alert(
          'Oups !',
          'Votre connexion ne vous permet pas de charger la pub vidéo',
          [
            { text: 'Ok', onPress: () => {} }
          ],
          { cancelable: false }
        );
      }
    }
  _unlockNiveau = (indice) => {
    if(indice == 1 || this.state.userScore.length + 1 >= indice){
      
      
    Alert.alert(
      'Niveau '+ indice,
      'Voulez-vous visionner une pub afin de dévérouiller ce niveau ?',
      [
        { text: 'Oui', onPress: () => {
           this.launchAd(indice);
          
          //////// AJOUTER DEVEROUILLAGE DANS LA BDD
          
          /////// SI 200, METTRE A JOUR REDUX
        } },
        { text: 'Non', onPress: () => {} }
      ],
      { cancelable: false }
    );
  }else{
    Alert.alert(
      'Niveau '+ indice,
      'Déverouillez les niveaux dans l\'ordre',
      [
        { text: 'Ok', onPress: () => {} }
      ],
      { cancelable: false }
    );
  }
}
  _goGame = (indice) => {
    this.props.navigation.navigate('Game', {indice :indice})
  }
  componentDidUpdate(){
    
  }
  componentDidMount() {
    this.props.navigation.addListener(
      'didFocus', () => {
        this.setState({boolUpdate : !(this.state.boolUpdate)})
      }, () =>{
        
      }
    );
    axios.create({
      baseURL: 'https://www.winyourcar.fr/api',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer '+this.state.userToken,
      },
    }).get('http://winyourcar.fr/api/score/all').then(
        (res) => {
           let tamp = []
           let i=0;
           for(i=0; i<res.data.length; i++){
             tamp[i] = res.data[i].score
           }
           const action = { type: "SETSCORE", value: tamp }
          this.props.dispatch(action)
          this.setState({
            userScore : tamp
          })
        },
        (err) => {
 
          }); /// FIN GET SCORE
        if(this.props.userScore.length == 10){
          let tamp = this.props.userScore;
          let resultat = 0;
          let k=0;
          for(k=0; k<10; k++){
            resultat = resultat + parseInt(tamp[k])
          }
          this.setState({
            scorefinal : resultat
          })
        }
  }
  _getScoreFinal(){
    if(this.props.userScore.length == 10){
      let tamp = this.props.userScore;
      let resultat = 0;
      let k=0;
      for(k=0; k<10; k++){
        resultat = resultat + parseInt(tamp[k])
      }
      if(isNaN(resultat)){
        resultat = '...'
      }
        return (<Text>{resultat}</Text>)
      
    }
      else{return(<Text>...</Text>)
  }
}

  render() {
    return(
     <Background>
       <View style={styles.ligne}>
          <View style={styles.cellule} ><Case indice={1} score={this.props.userScore} bool={this.boolUpdate} unlockNiveau={this._unlockNiveau} 
          goGame={this._goGame} extraData={this.props.userScore}
          /></View> 
          <View style={styles.cellule}><Case indice={2} score={this.props.userScore} bool={this.boolUpdate} unlockNiveau={this._unlockNiveau}
           goGame={this._goGame}
           /></View> 
          <View style={styles.cellule}><Case indice={3} score={this.props.userScore} bool={this.boolUpdate} unlockNiveau={this._unlockNiveau}
           goGame={this._goGame}
           /></View>
       </View>
       <View style={styles.ligne}>
          <View style={styles.cellule} ><Case indice={4} score={this.props.userScore} bool={this.boolUpdate} unlockNiveau={this._unlockNiveau}
           goGame={this._goGame}
           /></View> 
          <View style={styles.cellule}><Case indice={5} score={this.props.userScore} bool={this.boolUpdate} unlockNiveau={this._unlockNiveau}
           goGame={this._goGame}
           /></View> 
          <View style={styles.cellule}><Case indice={6} score={this.props.userScore} bool={this.boolUpdate} unlockNiveau={this._unlockNiveau}
           goGame={this._goGame}
           /></View>
       </View>
       <View style={styles.ligne}>
          <View style={styles.cellule} ><Case indice={7} score={this.props.userScore} bool={this.boolUpdate} unlockNiveau={this._unlockNiveau}
           goGame={this._goGame}
           /></View> 
          <View style={styles.cellule}><Case indice={8} score={this.props.userScore} bool={this.boolUpdate} unlockNiveau={this._unlockNiveau}
           goGame={this._goGame}
           /></View> 
          <View style={styles.cellule}><Case indice={9} score={this.props.userScore} bool={this.boolUpdate} unlockNiveau={this._unlockNiveau}
           goGame={this._goGame}
           /></View>
       </View>
       <View style={styles.ligne}>
         <Case indice={10} score={this.props.userScore} bool={this.boolUpdate} unlockNiveau={this._unlockNiveau}  goGame={this._goGame}/>
       </View>
       <Text style={styles.scoreFinal}>SCORE FINAL : {this._getScoreFinal()} </Text>
     </Background>
    )
    }
}

const styles = StyleSheet.create({
   ligne : {
     flexDirection : "row",
     justifyContent : "flex-start",
     width : Dimensions.get('window').width,
     justifyContent : "space-evenly",
     marginTop : 15
   },
   scoreFinal:{
     fontSize : 30,
     fontWeight : '800',
     color : 'red',
     marginTop : 15
   },
  })

  const mapStateToProps = (state) => {
    return {
      userToken: state.userToken,
      userScore: state.userScore
    }
  }
  
export default connect(mapStateToProps)(Grille)
