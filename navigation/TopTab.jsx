import { View, Image } from 'react-native'
import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Onboarding, TopBookings, TopInfo, TopTrips} from '../screens'
import { COLORS, SIZES } from '../constants/theme';
import { AppBar, HeightSpacer, NetworkImage, ReusableText } from '../components';
import styles from './topTab.style'
import { useNavigation } from '@react-navigation/native'; // Navigation hook'u
const Tab = createMaterialTopTabNavigator();


const TopTab = ({navigation}) => {
  return (
    <View style={{flex:1}}>
        <View style={{backgroundColor: COLORS.lightWhite}}>
            <View>
               
                <NetworkImage
                source={
                    "https://sc01.alicdn.com/kf/HTB12ud2oYZnBKNjSZFKq6AGOVXaW/230651015/HTB12ud2oYZnBKNjSZFKq6AGOVXaW.jpg"
                }
                width={'100%'}
                height={300}
                radius={0}
                /> 
                

                <AppBar
                top={40}
                left={20}
                right={20}
                color={COLORS.white}
                icon={'logout'}
                color1={COLORS.white}
                onPress={() => navigation.goBack()} 
                />

              <View style={styles.profile}>
                <Image source={{uri:"https://yt3.googleusercontent.com/ytc/AIdro_mh11Qc2DMnVg95l9dFUsLsImxQqT8WACZiJr9WsFWleA=s900-c-k-c0x00ffffff-no-rj" }}
                style={styles.image}
              />

              <HeightSpacer height={5}/>

              
                <View style={{alignItems: "center"}}>
                  <ReusableText
                    text={'Ahmet Şimşek'}
                    family={"medium"}
                    size = {SIZES.medium}
                    color = {COLORS.black}
                  />

                </View>
              

              <HeightSpacer height={5}/>
              <View style= {styles.name}>
            
                <View style={{alignItems: "center"}}>
                  <ReusableText
                    text={'ahmtsmsek7@gmail.com'}
                    family={"medium"}
                    size = {SIZES.medium}
                    color = {COLORS.white}
                  />

                </View>
              </View>
              </View>      
          </View>
        </View>
      <Tab.Navigator>
        <Tab.Screen name='Favoriler' component={TopBookings}/>
        <Tab.Screen name='Rezarvasyonlar' component={TopTrips}/>
        <Tab.Screen name='Hesap' component={TopInfo}/>
      </Tab.Navigator>
    </View>
  )
}

export default TopTab