import { View, Image } from 'react-native';
import React from 'react';
import styles from './slides.style';
import {HeightSpacer, ReusableBtn, ReusableText} from '../../components/index';
import { COLORS, SIZES } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';

export const Slides = ({item}) => {
  const navigation = useNavigation();
  return (
    <View>
        <Image source={item.Image} style={styles.image} />

            <View style = {styles.stack}>
              <ReusableText
              text={item.title}
              family={'medium'}
              size = {SIZES.xxLarge}
              color = {COLORS.white}
              />

              <HeightSpacer height={20}/>

              <ReusableBtn
              onPress={() => navigation.navigate('Bottom') }
              btnText = {"Başlayalım"}
              width={(SIZES.width - 50) /2.2}  
              backgroundColor = {COLORS.red}  
              borderColor={COLORS.red}
              borderWidth = {0}  
              textcolor = {COLORS.white}  
              />


            </View>

    </View>
  );
};

export default Slides;