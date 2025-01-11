import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  NetworkImage,
  AppBar,
  ReusableText,
  HeightSpacer,
  DescriptionText,
  ReusableBtn,
} from '../../components/index';
import { COLORS, TEXT, SIZES } from '../../constants/theme';
import reusable from '../../components/Reusable/reusable.style';
import { Feather } from '@expo/vector-icons';

const PlaceDetails = ({ navigation }) => {
  const route = useRoute();
  const { event } = route.params || {};

  const venue = event?._embedded?.venues?.[0];
  const latitude = venue?.location?.latitude || 39.92077; // Ankara için varsayılan enlem
  const longitude = venue?.location?.longitude || 32.85411; // Ankara için varsayılan boylam
  
  
  if (!latitude || !longitude) {
    console.error("Konum bilgisi eksik!");
  }
  console.log(latitude,longitude)


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView>
        <View>
          <NetworkImage
            source={event?.images?.[0]?.url || ''}
            width="100%"
            height={200}
            radius={5}
          />

          <AppBar
            top={10}
            left={10}
            right={10}
            title={event?.name || 'Event Name'}
            color={COLORS.white}
            icon="search1"
            color1={COLORS.white}
            onPress={() => navigation.goBack()}
          />

          <View style={styles.description}>
            <HeightSpacer height={15} />

            <ReusableText
              text={venue?.name || 'Venue Not Available'}
              family="medium"
              size={TEXT.xLarge}
              color={COLORS.black}
            />

            <DescriptionText
              text={
                event?.info ||
                'Seçtiğin konumdaki en yakın etkinliklerden birindesin. Konumu takip et ve eğlenceyi doyasıya yaşa.'
              }
            />

            <HeightSpacer height={20} />
            <View style={{ height: 200, borderRadius: 15, overflow: 'hidden', marginTop: 20 }}>
  {latitude && longitude ? (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      <Marker
        coordinate={{ latitude, longitude }}
        title={venue?.name || 'Konum'}
        description={venue?.city?.name || 'Bilinmeyen Şehir'}
      />
    </MapView>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Konum bilgisi bulunamadı.</Text>
    </View>
  )}
</View>


            <HeightSpacer height={30} />

            <View style={reusable.rowWithSpace('space-between')}>
              <ReusableText
                text="Diğer Popüler Konserler"
                family="medium"
                size={TEXT.xLarge}
                color={COLORS.black}
              />
              <TouchableOpacity onPress={() => {}}>
                <Feather name="list" size={20} />
              </TouchableOpacity>
            </View>

            <HeightSpacer height={30} />

            <ReusableBtn
              onPress={() => navigation.navigate('HotelList')}
              btnText="En İyi Etkinlikleri Keşfet"
              width={SIZES.width - 40}
              backgroundColor={COLORS.green}
              borderColor={COLORS.green}
              borderWidth={0}
              textcolor={COLORS.white}
            />

            <HeightSpacer height={50} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  description: {
    marginHorizontal: 20,
  },
});
