import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { AssetImage, HeightSpacer, ReusableBtn, ReusableText } from '../../components';
import { COLORS, SIZES, TEXT } from '../../constants/theme';
import ReusableTile from '../../components/Reusable/ReusableTile';
import axios from 'axios';

const Failed = ({navigation}) => {
    const [data, setData] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          'https://app.ticketmaster.com/discovery/v2/events.json',
          {
            params: {
              apikey: 'J826mWiIVCSLNBUC8WoQEq0o98KECmCf',
              city: 'Erzurum',
              radius: 300,
              unit: 'km',
              sort: 'date,asc',
            },
          }
        );
        if (response.data?._embedded?.events) {
          setData(response.data._embedded.events);
        } else {
          setData([]); // No events found
        }
      } catch (error) {
        console.log('Error fetching events:', error.message);
      }
    };
    fetchEvent();
  }, []);

  return (
    <View>
      <View style={{ marginTop: '40%' }}>
        <AssetImage
          data={require('../../assets/images/Falied.png')}
          width={'100%'}
          height={200}
          mode={'contain'}
        />

        <HeightSpacer height={40} />

        <View style={{ alignItems: 'center' }}>
          <ReusableText
            text={'Rezarvasyon Başarısız'}
            family={'medium'}
            size={TEXT.xLarge}
            color={COLORS.black}
          />

          <HeightSpacer height={20} />

          <ReusableText
            text={'Rezarvasyon detayınızı aşağıda bulabilirsiniz'}
            family={'regular'}
            size={SIZES.medium}
            color={COLORS.gray}
          />

          <HeightSpacer height={20} />
        </View>

        <View style={{ margin: 20 }}>
          <ReusableText
            text={'Etkinlik Detayı'}
            family={'bold'}
            size={SIZES.medium}
            color={COLORS.dark}
          />

          <HeightSpacer height={20} />

          <ReusableTile item={data} />

          <HeightSpacer height={40} />

          <ReusableBtn
            onPress={() => navigation.goBack()} // Ensure the correct navigation route
            btnText={'Tekrar Deneyin'}
            width={SIZES.width - 50}
            backgroundColor={COLORS.red}
            borderColor={COLORS.red}
            borderWidth={0}
            textcolor={COLORS.white}
          />
        </View>
      </View>
    </View>
  );
};
export default Failed

const styles = StyleSheet.create({})