import { View, Text, ScrollView  } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { COLORS } from '../constants/theme'
import { HeightSpacer, AssetImage } from '../components'
import Signin from '../screens/authentication/Signin'
import Registration from '../screens/authentication/Registration'

const Tab = createMaterialTopTabNavigator();

const AuthTopTab = () => {
  return (
    <View style={{flex:1, backgroundColor: COLORS.lightWhite}}> 
        <ScrollView style={{flex:1, backgroundColor: COLORS.lightWhite}}> 
        <HeightSpacer height={80}/>

        <AssetImage
        data={require('../assets/images/bg2.png')}
        width={'100%'}
        height={250}
        mode={'contain'}/>

            <View style={{height: 600}}>
                <Tab.Navigator>
                    <Tab.Screen name= 'Giriş Yap' component={Signin}/>
                    <Tab.Screen name= 'Kaydol' component={Registration}/>
                </Tab.Navigator>
            </View>
        </ScrollView>
    </View>
  )
}

export default AuthTopTab