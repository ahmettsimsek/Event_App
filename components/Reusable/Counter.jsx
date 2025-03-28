import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import {AntDesign} from '@expo/vector-icons'
import reusable from './reusable.style'
import { COLORS, SIZES } from '../../constants/theme'
import ReusableText from './ReusableText'

const Counter = () => {
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(count+ 1)
    }

    const decrement = () => {
        if(count > 1){
            setCount(count - 1)
        }
    }
    
    
  return (
    <View style={reusable.rowWithSpace('flex-start')}>
      <AntDesign
      name='minussquareo'
      size={26}
      color={COLORS.gray}
      onPress={decrement}
      />

      <ReusableText
        text={`   ${count}    `}
        family={"regular"}
        size = {SIZES.medium}
        color = {COLORS.black}
      />

      <AntDesign
      name='plussquareo'
      size={26}
      color={COLORS.gray}
      onPress={increment}
      />
    </View>
  )
}

export default Counter

const styles = StyleSheet.create({})