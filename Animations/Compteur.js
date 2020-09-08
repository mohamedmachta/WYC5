// Animations/FadeIn.js

import React from 'react'
import { Animated, Dimensions, Easing, StyleSheet } from 'react-native'

class Compteur extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fontSize : new Animated.Value(14)
    }
  }

  componentDidMount() {
    
       
        Animated.timing(
          this.state.fontSize,
          {
            toValue: 70,
            duration: 1000,
            easing: Easing.sin
          }
        ).start()
  }

    
  render() {
    return (
      <Animated.View
        style={{ top: this.state.positionTop }}
        >
            <Animated.Text
            style={[{ fontSize: this.state.fontSize }, styles.texte]}
            >
                {this.props.children}
            </Animated.Text>
      </Animated.View>
    )
    }
}

const styles = StyleSheet.create({
    // Soit on utilise la fonction Platform.select
    texte :{
        color : 'red',
        fontWeight : 'bold'
    }
    })

export default Compteur 