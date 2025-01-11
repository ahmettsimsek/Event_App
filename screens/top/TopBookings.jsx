import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../../components/Reusable/AppBar';
import { COLORS } from '../../constants/theme';
import ReusableTile from '../../components/Reusable/ReusableTile';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Location from "expo-location";

const TopBookings = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [favorites, setFavorites] = useState([]); // Favoriler başlangıçta boş
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [location , setLocation] = useState()
const [count , setCount] = useState(3)
  const getRandomItems = (array, count) => {
    const result = [];
    const taken = new Set();

    while (result.length < count && result.length < array.length) {
      const randomIndex = Math.floor(Math.random() * array.length);
      if (!taken.has(randomIndex)) {
        result.push(array[randomIndex]);
        taken.add(randomIndex);
      }
    }

    return result;
  };


  useEffect(() => {
    Alert.alert("Uyarı!", "favorilere eklediğin bir etkinliğin sınırlı sayıda bileti kaldı. Tükenmeden almak için şimdi satın al.", [{ text: "Tamam", onPress: () => {} }]);
  }, []);

  useEffect(() => {
    const fetchLocationAndEvents = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Konum izni verilmedi.");
          setLoading(false);
          return;
        }

        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation)
        const response = await axios.get(
          "https://app.ticketmaster.com/discovery/v2/events.json",
          {
            params: {
              apikey: "J826mWiIVCSLNBUC8WoQEq0o98KECmCf",
              latlong: `${userLocation.coords.latitude},${userLocation.coords.longitude}`,
              radius: 300,
              unit: "km",
              sort: "date,asc",
            },
          }
        );

        if (response.data?._embedded?.events) {
          const randomData = getRandomItems(response.data._embedded.events, count);
          setData(randomData);
        } else {
          setData([]);
        }

      } catch (error) {
        setErrorMsg("Etkinlikler alınırken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocationAndEvents();
  }, []);
  

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

  if (!data || data.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Hiçbir etkinlik bulunamadı.</Text>
      </SafeAreaView>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/festival-of-colors-spanish-2622.webp')} // Arka plan resmi
      style={styles.backgroundImage}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.overlay}>
          <AppBar
            title="Öneri Listesi"
            onPress={() => navigation.goBack()}
            onPress1={() => navigation.navigate('Search')}
          />
          <FlatList
            data={data}
            keyExtractor={(item) => item.id || `event-${Math.random()}`}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 10 }}>
                <ReusableTile
                  item={{
                    title: item.name || "Etkinlik Adı Yok",
                    description: item.info || "Açıklama bulunamadı.",
                    imageUrl: item.images?.[0]?.url || "",
                    location: item._embedded?.venues?.[0]?.name || "Bilinmeyen Lokasyon",
                    rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
                    review: Math.floor(Math.random() * (100 - 50) + 50),
                  }}
                  onPress={() =>
                    navigation.navigate("HotelDetails", {
                      event: item,
                      location:location
                      
                    })
                  }
                />
      <TouchableOpacity
  style={styles.favoriteButton}
  onPress={() => {
    if (favorites.includes(item.id)) {
      // Favorilerde varsa, çıkar ve count'u azalt
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favoriteId) => favoriteId !== item.id)
      );
      setCount((prevCount) => Math.max(0, prevCount - 1)); // Count'u 1 azalt, sıfırın altına düşmesin

      // Verileri tekrar yükle
      const updatedData = data.filter((event) => event.id !== item.id);
      setData(updatedData);
    } else {
      // Favorilerde yoksa, ekle ve count'u artır
      setFavorites((prevFavorites) => [...prevFavorites, item.id]);
      setCount((prevCount) => prevCount + 1);
    }
  }}
>
  <Icon
    name="heart" // İlk durumda kalbin içi dolu
    size={24}
    color={favorites.includes(item.id) ? "gray" : "red"} // Favori ise kırmızı, değilse gri
  />
</TouchableOpacity>

              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default TopBookings;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Opak arka plan
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
