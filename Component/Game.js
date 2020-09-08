import React, { memo } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Image, Alert, Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Background from './LevelBackground';
import Essence from './Essence'
import { connect } from 'react-redux'
import axios from 'axios'
import { Buffer } from "buffer";
import Compteur from '../Animations/Compteur'
import MathText from 'react-native-math';
import BouttonAdmob from './BouttonAdmob'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  TouchableHighlight,
} from 'expo-ads-admob';

class Game extends React.Component {
    
  constructor(props) {
    super(props)
    this.state={
      essence : [3, 3, 3, 3, 3],
      imageCar : "",
      ombreCar : "",
      idVoiture : 1,
      gameReady : false,
      etat : "ready",
      boolCompteur : false,
      decompte : "",
      positionVoiture : 0,
      vitesse : 20,
      isDriving : false,
      precision : 0,
      temps : 20,
    }
    const credit = 0
  }

  _updateCredit = (axiosVal) => {
    axiosVal.get('http://winyourcar.fr/api/credit').then(
      (res) => {
        
          let credit = res.data.credit
          var tamp;
          if(credit == 5){
            tamp = [1,1,1,1,1]
          }
          else if(credit == 4){
            tamp = [1,1,1,1,3]
          }else if(credit == 3){
            tamp = [1,1,1,3,3]
          }else if(credit == 2){
            tamp = [2,2,3,3,3]
          }else if(credit == 4){
            tamp = [2,3,3,3,3]
          }else{tamp = [3,3,3,3,3]}
          this.setState({
            essence : tamp
          })
         },
      (err) => {
          console.log(err)
        });
  }

  componentDidMount() { 
    if(this.props.navigation.state.params.indice == 1){
    }
    else if(this.props.navigation.state.params.indice == 2){
      this.setState({
        vitesse : 35
      })
    }
    else if(this.props.navigation.state.params.indice == 3){
      this.setState({
        vitesse : 40
      })
    }
    else if(this.props.navigation.state.params.indice == 4){
      this.setState({
        vitesse : 45
      })
    }
    else if(this.props.navigation.state.params.indice == 5){
      this.setState({
        vitesse : 49
      })
    }
    else if(this.props.navigation.state.params.indice == 6){
      this.setState({
        vitesse : 52
      })
    }
    else if(this.props.navigation.state.params.indice == 7){
      this.setState({
        vitesse : 55
      })
    }
    else if(this.props.navigation.state.params.indice == 8){
      this.setState({
        vitesse : 57
      })
    }
    else if(this.props.navigation.state.params.indice == 9){
      this.setState({
        vitesse : 60
      })
    }
    else if(this.props.navigation.state.params.indice == 10){
      this.setState({
        vitesse : 85
      })
    }

  
    let Axios = axios.create({
      baseURL: 'https://www.winyourcar.fr/api',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer '+this.props.userToken,
      },
    })
      ////////////////Gestion essence
    Axios.get('http://winyourcar.fr/api/credit').then(
        (res) => {
          
            let credit = res.data.credit
            var tamp;
            if(credit == 5){
              tamp = [1,1,1,1,1]
            }
            else if(credit == 4){
              tamp = [1,1,1,1,3]
            }else if(credit == 3){
              tamp = [1,1,1,3,3]
            }else if(credit == 2){
              tamp = [2,2,3,3,3]
            }else if(credit == 1){
              tamp = [2,3,3,3,3]
            }else{tamp = [3,3,3,3,3]}
            this.setState({
              essence : tamp
            })
           },
        (err) => {
            console.log(err)
          });
              ////////////// RECUPERATION IMAGES VOITURES
          Axios.get('http://winyourcar.fr/api/car').then(
            (res) => {
              this.setState({
                idVoiture : res.data.id
              }, () => {
                      let i = 0;
                          Axios.get('http://winyourcar.fr/api/car/'+this.state.idVoiture+'/image',{responseType: 'arraybuffer'}).then(
                            (res2) => {
                              const image64 = Buffer.from(res2.data, 'binary').toString('base64');
                              this.setState({
                                imageCar : image64,
                                gameReady : true
                              })
                              },
                            (err2) =>{
                              console.log(err2)
                            });
                            i++;
                            Axios.get('http://winyourcar.fr/api/car/'+this.state.idVoiture+'/shadow',{responseType: 'arraybuffer'}).then(
                            (res2) => {
                              const image64 = Buffer.from(res2.data, 'binary').toString('base64');
                              this.setState({
                                ombreCar : image64
                              })
                              },
                            (err2) =>{
                                console.log(err2)
                                Alert.alert(
                                  'Oups !',
                                  'Vérifiez votre connexion internet',
                                  [
                                    { text: 'Ok', onPress: () => {} }
                                  ],
                                  { cancelable: false }
                                );
                            });
                            i++;
                        }
              )  
            },
            (err) =>{
              console.log(err)
            });
           
  }

  gameBegin = (event)=>{
    if(this.state.etat == "ready" && this.state.gameReady && this.state.essence[0] != 3 && this.state.boolCompteur == false){
        this.setState({ boolCompteur : true });
        var k = 0;
        var valDecompte = ["3", "2", "1", "GO !"]
        var interval = setInterval(() => {  
            this.setState({ decompte : valDecompte[k] })
            k++
            this.setState({boolCompteur : false})
            this.setState({boolCompteur : true})
            
            if(k>4){
                clearInterval(interval);
                this.setState({boolCompteur : false})
                this.setState({ decompte : "" })

            }
            if(k==4){
              this.setState({
                etat : "drive",
                isDriving : true,
            },()=>{
              let temps = 0
              var interval2 = setInterval(() => {  
                if(this.state.etat == "drive"){
                  temps = temps + 1/2;
                  this.setState({
                    temps : Math.trunc(temps*0.1*10)/10
                  })
                  let tamp = this.state.positionVoiture + this.state.vitesse
                  this.setState({
                    positionVoiture : tamp
                  })
                  if(this.state.positionVoiture > Dimensions.get('window').width){
                    this.setState({
                      positionVoiture : -(Dimensions.get('window').width)
                    })
                  }
                }
                else{
                  
                  clearInterval(interval2);
                }
                
              }, 25);
            }
            
            )
              ;}
            }, 1000);
          }
          else{
          }
          if(this.state.etat == "drive"){
            this.setState({
              etat : "freeze"
            }, () => {
              let m = 0;
              var interval3 = setInterval(() => {
              if(m == 1){
              let precision = 20 - ( 20*   ( 1 - ( (  Dimensions.get('window').width - Math.sqrt(this.state.positionVoiture*this.state.positionVoiture)) /  Dimensions.get('window').width  )  )    )
              precision = Math.trunc(precision*100)/100
              this.setState({precision : precision}, () => {
                ///////////////// SAVE SCORE DANS BDD
                  let score = Math.trunc(this.state.precision/this.state.temps*100)/100
                  let Axios2 = axios.create({
                    baseURL: 'https://www.winyourcar.fr/api',
                    headers: {
                      Accept: 'application/json',
                      Authorization: 'Bearer '+this.props.userToken,
                    },
                  })
                  let param={
                    "level" : this.props.navigation.state.params.indice,
                    "score" : score,
                    "time" : this.state.temps,
                    "calibration" : this.state.precision
                  }
                  Axios2.post('http://winyourcar.fr/api/score/save', param).then(
                    (res2) => {
                      this._updateCredit(Axios2);
                      let tampScore = this.props.userScore;

                      tampScore[this.props.navigation.state.params.indice-1] = score +""
                      const action = { type: "SETSCORE", value: tampScore }
                      this.props.dispatch(action)
                      },
                    (err2) =>{
                      console.log(err2)
                    });


              })






                this.setState({
                  etat : "ready",
                  positionVoiture : 0
                }, () =>{
                clearInterval(interval3);})
              }else{
                m++;
              }
            }, 1500)})
          }
  
  }

 
  _vueCompteur()
  {
    if(this.state.boolCompteur){
        return (
            <Compteur>{this.state.decompte}</Compteur>  
        );
    }
    else{   
    }
  }
  
  
      async _rechargerCredit(){
        AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/1712485313')
      await AdMobRewarded.requestAdAsync()
      if(await AdMobRewarded.getIsReadyAsync()){
        await AdMobRewarded.showAdAsync()
        let Axios = axios.create({
          baseURL: 'https://www.winyourcar.fr/api',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer '+this.props.userToken,
          },
        })
        let param = {
          "credit" : 5
        }
        Axios.post('http://winyourcar.fr/api/credit', param).then(
                    (res2) => {
                      this.setState({
                        essence : [1,1,1,1,1]
                      })
                      },
                    (err2) =>{
                      console.log(err2)
                    });
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

      _bouttonAdmob(){
          if(this.state.essence[0] === 3){
              return (
                  <TouchableOpacity onPress={() => {this._rechargerCredit()}} style={styles.bouton}>
                  <Image 
            style={styles.icone}
            source = {require( '../assets/bouton.png')}
           />
           <Text>ok</Text>
           </TouchableOpacity>
              )
          }
          else{
              return (
                <TouchableOpacity >
              <Image 
                  style={styles.icone}
                  source = {require( '../assets/bouton-.png')}
                 />
                 </TouchableOpacity>
                 )
          }
    }

  render() {
    return(
     <Background>
       <TouchableOpacity style={styles.container  } onPress={() => {this.gameBegin(); } }>
         <Text style={styles.title}>Niveau {this.props.navigation.state.params.indice}</Text>
         <View style={styles.blocEssence}><Essence nb={1} essence={this.state.essence} />
         <Essence nb={2}  essence={this.state.essence} />
         <Essence nb={3}  essence={this.state.essence} />
         <Essence nb={4}  essence={this.state.essence} />
         <Essence nb={5}  essence={this.state.essence} />
         {this._bouttonAdmob()}
         </View>
         
         <View style={styles.compteur}>
         {this._vueCompteur()}
         </View>
         <View style={styles.blocVoitures}>
         <Image
         style={styles.ombreImage}
         source={{uri: 'data:image/png;base64,' + this.state.ombreCar}} />
         <Image
          style={[{ left: this.state.positionVoiture }, styles.voitureImage]}
          source={{uri: 'data:image/png;base64,' + this.state.imageCar}} />
         </View>
        
         <View style={styles.vueTemps}><Text style={styles.temps}>Temps : {this.state.temps}</Text>
         <Text style={styles.temps}>Précision : {this.state.precision}</Text>
         </View>
         <View style={styles.blocScore}>
           <Image 
            source={require( '../assets/score.png')}
            style={styles.score}
         />
            </View>
          </TouchableOpacity>
     </Background>
    )
    }
}


const styles = StyleSheet.create({
  title : {
    fontSize : 35,
    fontWeight : '900',
    position : 'relative',
    textAlign : "center",
    marginTop : 50, 
    flex : 1
  },
  vueTemps:{
    justifyContent : "flex-end",
    flex : 2
  },
  temps:{
    fontSize :20,
    fontWeight : '600',
    marginLeft : 20
  },
  boutonTest:{
      width : 50,
      height : 50,
      backgroundColor : "red"
  },
  voitureImage:{
    marginTop : 50,
    width : Dimensions.get('window').width/1.3,
    height : Dimensions.get('window').width/2.6,
    position : 'absolute',
  },
  vueImage:{
    position : 'absolute',
    left : 0
  },
  ombreImage:{
    marginTop : 50,
    width : Dimensions.get('window').width/1.3,
    height : Dimensions.get('window').width/2.6,
    position : 'absolute',
    left : 0
  },
  blocVoitures:{
      position : 'relative',
      width : Dimensions.get('window').width,
      justifyContent : "center", 
      height : 150 , 
      flex : 3,
      flexDirection : 'row',
      left : 40
      
  },
  blocEssence:{
    flexDirection: "row",
    marginBottom : 10,
    flex : 1.5,
    justifyContent : "center",
  },
  score:{
    width : 250,
    height : 130,
    position : 'absolute'
  },
  blocScore :{
    position : "relative",
    flex : 2,
    justifyContent : "flex-end",
    top : 40,
    right : 40
  },
  compteur : {
      flex : 1.2,
      textAlign : "center",
      flexDirection : 'row',
      justifyContent : "center",
  },
  icone:{
    width : 70,
    height : 70,
  },
  container:{
    flex : 1,
    zIndex : 1
  }
  
  })

  const mapStateToProps = (state) => {
    return {
      userToken: state.userToken,
      userScore: state.userScore
    }
  }
  
export default connect(mapStateToProps)(Game)
