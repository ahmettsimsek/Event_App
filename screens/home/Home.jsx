import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import reusable from '../../components/Reusable/reusable.style';
import { ReusableText, HeightSpacer, Recommendations } from '../../components';
import { COLORS, SIZES, TEXT } from '../../constants/theme';
import { AntDesign, Ionicons } from "@expo/vector-icons";
import importedStyles from './home.style';
import Places from '../../components/Home/Places';
import BestHotels from '../../components/Home/BestHotels';
import axios from 'axios';
import * as Location from "expo-location";

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false); // Bildirim durumu

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Konum izni reddedildi.");
          setLoading(false);
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        setErrorMsg("Konum alınırken bir hata oluştu.");
        console.error("Konum Hatası:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!location) return;

      try {
        const response = await axios.get(
          "https://app.ticketmaster.com/discovery/v2/events.json",
          {
            params: {
              apikey: "J826mWiIVCSLNBUC8WoQEq0o98KECmCf",
              latlong: `${location.coords.latitude},${location.coords.longitude}`,
              radius: 300,
              unit: "km",
              sort: "date,asc",
            },
          }
        );
        if (response.data?._embedded?.events) {
          setData(response.data._embedded.events);
        } else {
          console.log("No events found!");
        }
      } catch (error) {
        console.log("Error fetching events:", error);
      }
    };

    fetchEvent();
  }, [location]);

  useEffect(() => {
    Alert.alert("Öneri", "2025-01-15 tarihindeki Erzurum/Palandöken İce Break konseri ilginizi çekebilir!", [{ text: "Tamam", onPress: () => {} }]);
  }, []);

  const handleNotificationPress = () => {
    setNotificationsEnabled((prev) => !prev); // Durumu değiştir
    if (!notificationsEnabled) {
      Alert.alert("Bildirim", "Bildirim ayarlarını kapattınız.");
      
    } else {
      Alert.alert("Bildirim", "Bildirim ayarlarını açtınız.");
    }
  };

  return (
    <SafeAreaView style={reusable.container}>
      <View>
        <View style={reusable.rowWithSpace('space-between')}>
          <ReusableText
            text={'Merhaba Kullanıcı !'}
            family={"regular"}
            size={TEXT.large}
            color={COLORS.gray}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Arama İkonu */}
            <TouchableOpacity style={importedStyles.box} onPress={() => navigation.navigate('Search')}>
              <AntDesign name='search1' size={26} />
            </TouchableOpacity>
          
            {/* Bildirim İkonu */}
            <TouchableOpacity style={styles.notificationIcon} onPress={handleNotificationPress}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="notifications-outline"
                  size={26}
                  color={notificationsEnabled ? COLORS.gray : COLORS.black} // Renk değişimi
                />
                {notificationsEnabled && <View style={styles.crossLine} />} {/* Çapraz çizgi */}
              </View>
            </TouchableOpacity>

          </View>
        </View>

        <HeightSpacer height={SIZES.xSmall} />

        <ReusableText
          text={'Kategoriler'}
          family={"medium"}
          size={TEXT.large}
          color={COLORS.green}
        />
        <HeightSpacer height={15} />

        <Places />  

        <Recommendations location={location} data={data} />

        <HeightSpacer height={15} />

        <BestHotels location={location} data={data} />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  notificationIcon: {
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative', // Çizginin ikona göre yerleşmesi için gerekli
  },
  crossLine: {
    position: 'absolute',
    width: 30, // Çizginin uzunluğu
    height: 2, // Çizginin kalınlığı
    backgroundColor: COLORS.red, // Çizginin rengi
    transform: [{ rotate: '45deg' }], // Çizgiyi çapraz yapmak için dönüş
    top: 12, // Çizginin konumunu ayarlayın (ikonun merkezine göre)
    left: -2, // Çizginin ikona hizalanması
  },
});
