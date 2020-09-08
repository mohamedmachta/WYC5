// Animations/FadeIn.js

import React from 'react'
import { Animated, Dimensions, Easing, StyleSheet, Text, Image } from 'react-native'
import { Assets } from 'react-navigation-stack'

class Voiture extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      leftPosition : new Animated.Value(this.props.leftOffset)
    }
  }

  componentDidMount() {
       
        Animated.timing(
          this.state.leftPosition,
          {
            toValue: (this.props.leftOffset + this.props.speed),
            duration: 1000,
            easing: Easing.linear
          }
        ).start()

  }

    
  render() {
    return (
      <Animated.View
      style={[{ left: this.state.leftPosition }, styles.vueImages]}
       >      
            
            {this.props.children}
      </Animated.View>
    )
    }
}

const styles = StyleSheet.create({
    // Soit on utilise la fonction Platform.select
    vueImages:{
        position : 'absolute'
      }
    })

export default Voiture 