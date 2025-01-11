import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ActivityIndicator, ScrollView, Image, ToastAndroid } from 'react-native';
import { AssetImage, HeightSpacer, ReusableBtn, ReusableText, Rating, WidthSpacer } from '../../components';
import { COLORS, SIZES, TEXT } from '../../constants/theme';
import axios from 'axios';

const Successful = ({ navigation, route }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Yükleniyor durumu

  const { item } = route.params; // Route params üzerinden gönderilen item verisini alıyoruz

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
          setData([]); // Eğer etkinlik bulunamazsa boş dizi
        }
      } catch (error) {
        console.log('Hata oluştu:', error.message);
        setData([]); // Hata durumunda boş dizi
      } finally {
        setLoading(false); // Veriler yüklendiğinde yükleniyor durumunu kapat
        handleShowToast(); // Toast bildirimi tetikleniyor
      }
    };

    fetchEvent();
  }, []);

  // Başarı bildirimini gösteren fonksiyon
  const handleShowToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Bilet alma işleminiz başarıyla gerçekleşmiştir.',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      200
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.green} />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ marginTop: 20 }}> {/* Sayfayı yukarı taşımak için marginTop değerini 20 yapıyoruz */}
        <AssetImage
          data={require('../../assets/images/checked.png')}
          width={'100%'}
          height={200}
          mode={'contain'}
        />

        <HeightSpacer height={40} />

        <View style={{ alignItems: 'center' }}>
          <ReusableText
            text={'Rezarvasyon Başarılı'}
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

        <View style={{ marginHorizontal: 20 }}>
          <View style={{ backgroundColor: COLORS.lightWhite, borderRadius: 16 }}>

            {/* Etkinlik Görseli */}
            <Image
              source={{ uri: item.images?.[0]?.url || 'https://via.placeholder.com/150' }}
              style={{ width: '100%', height: 200, borderRadius: 16 }}
            />

            <HeightSpacer height={20} />

            <View style={{ marginHorizontal: 10 }}>
              {/* Etkinlik Adı ve Puan */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ReusableText
                  text={item.name}
                  family={"medium"}
                  size={SIZES.medium}
                  color={COLORS.black}
                />
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>

                  {/* Rastgele Puan ve Yorum Sayısı */}
                  <Rating rating={(Math.random() * (5 - 3.5) + 3.5).toFixed(1)} />
                  <WidthSpacer width={10} />
                  <ReusableText
                    text={`(${Math.floor(Math.random() * (100 - 50) + 50)})`}
                    family={"regular"}
                    size={SIZES.medium}
                    color={COLORS.gray}
                  />
                </View>
              </View>

              <HeightSpacer height={10} />

              {/* Etkinlik Yeri */}
              <ReusableText
                text={item._embedded?.venues?.[0]?.name || 'Yer bilgisi yok'}
                family={"medium"}
                size={SIZES.medium}
                color={COLORS.gray}
                numberOfLines={1} // Metni bir satıra sığdırır
                ellipsizeMode='tail' // Taşarsa '...' ile bitirir
              />
              <View style={{ borderWidth: 0.5, borderColor: COLORS.lightGrey, marginVertical: 15 }}></View>
            </View>
          </View>
        </View>

        <HeightSpacer height={40} />

        {/* Butonu ortalamak için flex: 1 kullanıyoruz ve marginTop ile butonu aşağıya taşıyoruz */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ReusableBtn
            onPress={() => navigation.navigate('Bottom')} // Ana sayfaya yönlendirme
            btnText={'Ana sayfaya dön'}
            width={SIZES.width - 50}
            backgroundColor={COLORS.green}
            borderColor={COLORS.green}
            borderWidth={0}
            textcolor={COLORS.white}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Successful;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
