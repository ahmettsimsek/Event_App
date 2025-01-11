import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import { COLORS, TEXT } from '../../constants/theme';
import AppBar from '../../components/Reusable/AppBar';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import * as Location from 'expo-location';

const Recommended = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Konum izni reddedildi.');
          setLoading(false);
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        const response = await axios.get(
          'https://app.ticketmaster.com/discovery/v2/events.json',
          {
            params: {
              apikey: 'J826mWiIVCSLNBUC8WoQEq0o98KECmCf',
              latlong: `${currentLocation.coords.latitude},${currentLocation.coords.longitude}`,
              radius: 300,
              unit: 'km',
              sort: 'date,asc',
              size: 2,
            },
          }
        );

        if (response.data?._embedded?.events) {
          setData(response.data._embedded.events);
        } else {
          setData([]);
        }
      } catch (error) {
        setErrorMsg('Etkinlikler alınırken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleFavorite = (eventId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(eventId)) {
        return prevFavorites.filter((id) => id !== eventId);
      } else {
        return [...prevFavorites, eventId];
      }
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text>Yükleniyor...</Text>
      </SafeAreaView>
    );
  }

  if (errorMsg) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>{errorMsg}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Üst Bar */}
      <View style={{ height: 50 }}>
        <AppBar
          top={10}
          left={0}
          right={0}
          title={'Konserler'}
          color={COLORS.white}
          icon={'search1'}
          color1={COLORS.white}
          onPress={() => navigation.goBack()}
          onPress1={() => navigation.navigate('Search')}
        />
      </View>

      {/* Üst Görsel */}
      <Image
        source={{ uri: 'https://avatars.mds.yandex.net/i?id=fb11b240cad094119063011a221377ac_l-5086802-images-thumbs&ref=rim&n=13&w=1080&h=720' }}
        style={styles.bannerImage}
      />

      <View style={styles.contentContainer}>
        {/* Başlık ve Açıklama */}
        <Text style={styles.heading}>KONSERLER</Text>
        <Text style={styles.description}>
          Sana en yakın veya dilediğin herhangi bir konumdaki konsere ulaşmak hiç bu kadar kolay olmamıştı. Hadi sende
          listedeki bir konseri seç ve eğlenmeye hazır ol.
        </Text>

        {/* Popüler Etkinlikler */}
        <View style={styles.popularHeader}>
          <Text style={styles.popularTitle}>Popüler Etkinlikler</Text>
         
        </View>
        

        {/* Etkinlik Kartları */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.eventCard}
              onPress={() =>
                navigation.navigate('SayfaDetay', {
                  event: item,
                  location,
                })
              }
            >
              <Image source={{ uri: item.images?.[0]?.url || '' }} style={styles.eventImage} />
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{item.name || 'Etkinlik Adı Yok'}</Text>
                <Text style={styles.eventLocation}>{item._embedded?.venues?.[0]?.name || 'Bilinmeyen Lokasyon'}</Text>
                <Text style={styles.eventRating}>⭐ 4.5 (100 Reviews)</Text>
              </View>
              <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                <Icon
                  name={favorites.includes(item.id) ? 'heart' : 'hearto'}
                  size={24}
                  color={favorites.includes(item.id) ? 'red' : 'gray'}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />

        {/* Keşfet Butonu */}
        <TouchableOpacity style={styles.discoverButton} onPress={() => navigation.navigate('Recommended')}>
          <Text style={styles.discoverButtonText}>En İyi Etkinlikleri Keşfet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Recommended;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    
  },
  contentContainer: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: COLORS.green,
    lineHeight: 20,
  },
  popularHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  popularTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightWhite,
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  eventInfo: {
    flex: 1,
    marginLeft: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  eventLocation: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 5,
  },
  eventRating: {
    fontSize: 12,
    color: COLORS.black,
    marginTop: 5,
  },
  discoverButton: {
    backgroundColor: COLORS.green,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  discoverButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
