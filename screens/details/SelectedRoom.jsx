import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { AppBar, AssetImage, Counter, HeightSpacer, NetworkImage, ReusableBtn, ReusableText } from '../../components';
import { COLORS, SIZES } from '../../constants/theme';
import reusable from '../../components/Reusable/reusable.style';
import Rating from '../../components/Reusable/Rating'; // Doğru yoldan içe aktarın
import WidthSpacer from '../../components/Reusable/WidthSpacer'; // Doğru yolu kontrol edin


const SelectedRoom = ({navigation}) => {
    const router = useRoute();
    const {item} = router.params;

    
  return (
    <View>
     <View style={{height: 100}}>
      <AppBar
          top={50}
          left={20}
          right={20}
          title={item.name}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
      </View>  

       <View style={{marginHorizontal: 20}}>
        <View style={{backgroundColor: COLORS.lightWhite, borderRadius: 16}}>

        <Image
          source={{ uri: item.images?.[0]?.url || 'https://via.placeholder.com/150' }}          width={'100%'}
          height={200} // Sabit yükseklik
          radius={16}
        />



            <HeightSpacer height={20}/>
                                                   
            <View style={{marginHorizontal: 10}}>  
              <View style = {reusable.rowWithSpace('space-between')}>
                <ReusableText
                text={item.name}
                family={"medium"}
                size = {SIZES.medium}
                color = {COLORS.black}
                />
                <View style={reusable.rowWithSpace("flex-start")}>

                  <Rating rating={(Math.random() * (5 - 3.5) + 3.5).toFixed(1)}/>

                  <WidthSpacer width={10} />

                  <ReusableText
                  text={`(${Math.floor(Math.random() * (100 - 50) + 50)})` }
                  family={"regular"}
                  size = {SIZES.medium}
                  color = {COLORS.gray}
                  />
                </View>
             </View>

             <HeightSpacer height={10}/>

             <ReusableText
                text={item._embedded?.venues?.[0]?.name}
                family={"medium"}
                size = {SIZES.medium}
                color = {COLORS.gray}
                numberOfLines={1}  // Metni bir satıra sığdırır
                ellipsizeMode='tail' // Taşarsa '...' ile bitirir
              />
              <View style={{borderWidth: 0.5, borderColor: COLORS.lightGrey, marginVertical: 15}}>
              </View>

              <ReusableText
                text={'Etkinlik Gereksinimleri'}
                family={"regular"}
                size = {SIZES.large}
                color = {COLORS.dark}
              />

              <HeightSpacer height={30}/>

              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'}}>
                <ReusableText
                  text={'Etkinlik Fiyatı'}
                  family={"regular"}
                  size={SIZES.medium}
                  color={COLORS.black}
                />

                <ReusableText
                  text={"400 TL"}
                  family={"regular"}
                  size={SIZES.medium}
                  color={COLORS.gray}
                  style={{flexShrink: 1, maxWidth: '50%'}} // '400 TL' metni için maksimum genişlik ve taşmayı engelleme
                />
              </View>

              <HeightSpacer height={15}/>

              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'}}>
                <ReusableText
                  text={'Ödeme Yöntemi'}
                  family={"regular"}
                  size={SIZES.medium}
                  color={COLORS.black}
                />

                <View style = {reusable.rowWithSpace('space-between')}>
                <AssetImage mode={'contain'} width={50} height={40} data={require('../../assets/images/Visa.png')}/>
                <ReusableText
                  text={"Kredi kartı"}
                  family={"regular"}
                  size={SIZES.medium}
                  color={COLORS.black}
                  style={{flexShrink: 1, maxWidth: '50%'}} // '400 TL' metni için maksimum genişlik ve taşmayı engelleme
                />
                </View>
              </View>
             
              <HeightSpacer height={15}/>

              <View style = {reusable.rowWithSpace('space-between')}>
              <ReusableText
                text={'En az 1 Katılımcı'}
                family={"regular"}
                size = {SIZES.medium}
                color = {COLORS.black}
              />

              <Counter/>
              </View>
              <HeightSpacer height={30}/>

              <ReusableBtn
                    onPress={() => navigation.navigate('Success', {item})} // Ensure the correct navigation route
                    btnText={" Şimdi rezarvasyon yap"}
                    width={SIZES.width - 50}
                    backgroundColor={COLORS.green}
                    borderColor={COLORS.green}
                    borderWidth={0}
                    textcolor={COLORS.white}
                />

              <HeightSpacer height={30}/>
           </View>
        </View> 
      </View>
    </View>
  )
}

export default SelectedRoom

const styles = StyleSheet.create({})