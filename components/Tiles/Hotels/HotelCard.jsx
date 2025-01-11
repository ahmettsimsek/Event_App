import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES, TEXT } from '../../../constants/theme'
import  { HeightSpacer, NetworkImage, Rating, ReusableText } from '../../../components/index'

const HotelCard = ({item, margin, onPress}) => {
    console.log(item)
  return (
    <TouchableOpacity style={styles.card(margin)} onPress={onPress}>
        <View>
            <View style={styles.imageContainer}>
                <NetworkImage
                source={item.imageUrl}
                width={'90%'}
                height={'100%'}
                radius = {12}
                />

            </View>

            <HeightSpacer height={4}/>

            <View style={{padding: 6}}>
                <ReusableText
                text={item.title}
                family={"medium"}
                size = {SIZES.medium}
                color = {COLORS.black}
                />

                <HeightSpacer height={10}/>

                <ReusableText
                text={item.location}
                family={"medium"}
                size = {SIZES.medium}
                color = '#008080'
                />

                <HeightSpacer height={10}/>

                
                <ReusableText
                text={item.time}
                family={"medium"}
                size = {SIZES.medium}
                color = {COLORS.lightGreen}
                />

                <HeightSpacer height={10}/>
<View style={{flexDirection:"row" , alignItems:"center" , justifyContent:"space-between", padding:5 , marginBottom:20}}>
    
<Rating rating={item.rating}/>
<ReusableText
                text={item.date}
                family={"medium"}
                size = {SIZES.medium}
                color = '#4682b4'
                />

</View>

            </View>
        </View>

    </TouchableOpacity>
  )
}

export default HotelCard

const styles = StyleSheet.create({
    card: (margin) => ({
        width: SIZES.width/1.8,
        height: 315,
        borderRadius: 16,
        backgroundColor: COLORS.lightWhite,
        marginRight: margin,
        borderWidth: 2, // Çerçeve kalınlığı
  borderColor: COLORS.green, 
    }),
    imageContainer: {
        alignItems: "center",
        marginTop: 10,
        height: 150,
        
    }
})